/**
 * Notification Orchestrator — Sri Lakshmi Travels
 * Central service that coordinates SMS + Email + In-app notifications
 * Called after every booking action to ensure no notification is missed.
 * Uses Promise.allSettled() so one failure never blocks the others.
 */
const { sendSMS } = require('./smsService');
const { sendEmail } = require('./emailService');
const Notification = require('../models/Notification');

/**
 * Event-to-template mapping
 * Each event maps to: SMS template key, Email template key,
 * in-app notification title/message/type
 */
const EVENT_MAP = {
  BOOKING_RECEIVED: {
    sms: 'BOOKING_RECEIVED',
    email: 'BOOKING_RECEIVED',
    notifTitle: 'Booking Received',
    notifMsg: (data) => `Your booking for ${data.serviceName} on ${data.travelDate} has been received. We will confirm within 2 hours.`,
    notifType: 'booking',
  },
  BOOKING_CONFIRMED: {
    sms: 'BOOKING_CONFIRMED',
    email: 'BOOKING_CONFIRMED',
    notifTitle: 'Booking Confirmed ✅',
    notifMsg: (data) => `Your booking ${data.bookingId} for ${data.serviceName} is confirmed!`,
    notifType: 'booking',
  },
  DRIVER_ASSIGNED: {
    sms: 'DRIVER_ASSIGNED',
    email: 'DRIVER_ASSIGNED',
    notifTitle: 'Driver Assigned',
    notifMsg: (data) => `Your driver ${data.driverName} has been assigned for your ${data.travelDate} trip.`,
    notifType: 'driver',
  },
  BOOKING_CANCELLED: {
    sms: 'BOOKING_CANCELLED',
    email: 'BOOKING_CANCELLED',
    notifTitle: 'Booking Cancelled',
    notifMsg: (data) => `Your booking ${data.bookingId} has been cancelled.`,
    notifType: 'booking',
  },
  PAYMENT_SUCCESS: {
    sms: 'PAYMENT_SUCCESS',
    email: 'PAYMENT_SUCCESS',
    notifTitle: 'Payment Successful',
    notifMsg: (data) => `Payment of ₹${data.amount} received for booking ${data.bookingId}.`,
    notifType: 'payment',
  },
  TRIP_REMINDER: {
    sms: 'TRIP_REMINDER',
    email: 'TRIP_REMINDER',
    notifTitle: 'Trip Tomorrow! 🚌',
    notifMsg: (data) => `Reminder: Your trip to ${data.destination || data.serviceName} is tomorrow!`,
    notifType: 'reminder',
  },
  TRIP_COMPLETED: {
    sms: null, // No SMS for completion — only email + in-app
    email: 'REVIEW_REQUEST',
    notifTitle: 'Trip Completed — Share your review!',
    notifMsg: (data) => `Your trip to ${data.serviceName} is complete. We hope you had a great time!`,
    notifType: 'booking',
  },
  OTP: {
    sms: 'OTP',
    email: 'OTP',
    notifTitle: null, // No in-app notification for OTP
    notifType: null,
  },
};

/**
 * Extract a common data object from a booking document.
 * Works with CarBooking, DriverBooking, and PackageBooking models.
 */
const extractBookingData = (user, booking, extraData = {}) => {
  return {
    name: user.name,
    bookingId: booking._id?.toString()?.slice(-8)?.toUpperCase() || 'N/A',
    serviceName: booking.carName || booking.packageName || booking.serviceName || 'Travel Service',
    travelDate: booking.pickupDate
      ? new Date(booking.pickupDate).toLocaleDateString('en-IN')
      : booking.travelDate
        ? new Date(booking.travelDate).toLocaleDateString('en-IN')
        : 'N/A',
    passengers: booking.passengers || booking.adults || 1,
    children: booking.children || 0,
    totalAmount: booking.totalAmount || booking.totalPrice || booking.estimatedCost || 0,
    paidAmount: booking.paidAmount || 0,
    pickupLocation: booking.pickupLocation || booking.pickup || '',
    destination: booking.dropLocation || booking.destination || booking.packageName || booking.serviceName || '',
    ...extraData,
  };
};

/**
 * Main notification function — call this after every booking action
 * @param {Object} user - The user document (must have: _id, name, email, phone)
 * @param {Object} booking - The booking document
 * @param {string} eventType - One of EVENT_MAP keys
 * @param {Object} extraData - Additional data (e.g., driverName, driverPhone, etc.)
 */
const notify = async (user, booking, eventType, extraData = {}) => {
  const event = EVENT_MAP[eventType];
  if (!event) {
    console.warn(`⚠️ Unknown notification event: ${eventType}`);
    return;
  }

  const data = extractBookingData(user, booking, extraData);

  console.log(`🔔 Triggering ${eventType} notification for ${user.name} (${user.email})`);

  const promises = [];

  // 1. Save in-app notification to DB (if applicable)
  if (event.notifTitle) {
    promises.push(
      Notification.create({
        user: user._id,
        title: event.notifTitle,
        message: event.notifMsg(data),
        type: event.notifType,
        bookingId: booking._id,
      }).catch(err => {
        console.error('❌ In-app notification save failed:', err.message);
        return { success: false, error: err.message };
      })
    );
  }

  // 2. Send SMS (if template exists)
  if (event.sms && user.phone) {
    promises.push(sendSMS(user.phone, event.sms, data));
  }

  // 3. Send Email (if template exists)
  if (event.email && user.email) {
    promises.push(sendEmail(user.email, event.email, data));
  }

  // Run all in parallel — one failure must never block others
  const results = await Promise.allSettled(promises);

  // Log summary
  const fulfilled = results.filter(r => r.status === 'fulfilled').length;
  const rejected = results.filter(r => r.status === 'rejected').length;
  console.log(`   ✅ ${fulfilled} succeeded, ❌ ${rejected} failed for ${eventType}`);

  return results;
};

module.exports = { notify, extractBookingData };
