/**
 * SMS Service — MSG91 Integration for Sri Lakshmi Travels
 * Sends transactional SMS for booking events, OTP, reminders, etc.
 */
const axios = require('axios');

const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY;
const SENDER_ID = 'SLTRVL'; // 6-char sender ID — register with MSG91

const SMS_TEMPLATES = {
  BOOKING_RECEIVED: (data) =>
    `Hi ${data.name}, we received your booking (ID: ${data.bookingId}) for ${data.serviceName} on ${data.travelDate}. ` +
    `Our team will confirm within 2 hours. - Sri Lakshmi Travels`,

  BOOKING_CONFIRMED: (data) =>
    `Dear ${data.name}, your booking (ID: ${data.bookingId}) for ${data.serviceName} on ${data.travelDate} is CONFIRMED! ` +
    `Amount: Rs.${data.totalAmount}. For help call: ${process.env.COMPANY_PHONE || '+91 98765 43210'}. - Sri Lakshmi Travels`,

  DRIVER_ASSIGNED: (data) =>
    `Your driver for ${data.travelDate} trip: ${data.driverName}, Phone: ${data.driverPhone}, ` +
    `Vehicle: ${data.vehicle}. Booking ID: ${data.bookingId}. - Sri Lakshmi Travels`,

  TRIP_REMINDER: (data) =>
    `Reminder: Your trip to ${data.destination} is TOMORROW (${data.travelDate}). ` +
    `Driver: ${data.driverName} (${data.driverPhone}). Have a great journey! - Sri Lakshmi Travels`,

  BOOKING_CANCELLED: (data) =>
    `Your booking (ID: ${data.bookingId}) has been cancelled. ` +
    `Refund of Rs.${data.refundAmount || 0} will be processed in 5-7 days. - Sri Lakshmi Travels`,

  PAYMENT_SUCCESS: (data) =>
    `Payment of Rs.${data.amount} received for booking ID: ${data.bookingId}. ` +
    `Thank you for choosing Sri Lakshmi Travels! - Sri Lakshmi Travels`,

  OTP: (data) =>
    `Your OTP for Sri Lakshmi Travels is: ${data.otp}. Valid for 10 minutes. Do not share. - Sri Lakshmi Travels`,
};

const DLT_TEMPLATE_IDS = {
  BOOKING_RECEIVED: null,
  BOOKING_CONFIRMED: '69dd367d5f7a72a9c9051052', // Your approved order confirmed template
  DRIVER_ASSIGNED: null,
  TRIP_REMINDER: null,
  BOOKING_CANCELLED: null,
  PAYMENT_SUCCESS: null,
  OTP: null,
};

/**
 * Send SMS via MSG91
 * @param {string} phone - 10-digit Indian mobile number
 * @param {string} templateKey - One of SMS_TEMPLATES keys
 * @param {object} data - Template data object
 */
const sendSMS = async (phone, templateKey, data) => {
  try {
    // If no MSG91 key configured, log and skip (dev mode)
    if (!MSG91_AUTH_KEY) {
      console.log(`📱 [SMS-DEV] Would send ${templateKey} to ${phone}:`);
      console.log(`   Message: ${SMS_TEMPLATES[templateKey](data)}`);
      return { success: true, dev: true };
    }

    // Skip actual sending if no DLT template ID is approved for this event yet
    if (!DLT_TEMPLATE_IDS[templateKey]) {
      console.log(`📱 [SMS-SKIP] No DLT Template ID for ${templateKey}. Skipping API call to prevent failure.`);
      console.log(`   Message: ${SMS_TEMPLATES[templateKey](data)}`);
      return { success: true, skipped: true, reason: 'No approved DLT Template ID' };
    }

    const message = SMS_TEMPLATES[templateKey](data);
    const response = await axios.post('https://api.msg91.com/api/v2/sendsms', {
      sender: SENDER_ID,
      route: '4', // transactional route
      country: '91',
      DLT_TE_ID: DLT_TEMPLATE_IDS[templateKey],
      sms: [{ message, to: [`91${phone}`] }],
    }, {
      headers: { authkey: MSG91_AUTH_KEY, 'Content-Type': 'application/json' },
    });

    console.log(`✅ SMS sent to ${phone} — ${templateKey}:`, response.data);
    return { success: true };
  } catch (error) {
    console.error(`❌ SMS send failed (${templateKey} → ${phone}):`, error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { sendSMS, SMS_TEMPLATES };
