/**
 * SMS Service — Textbee Integration for Sri Lakshmi Travels
 * Sends transactional SMS for booking events via your own Android phone!
 */
const axios = require('axios');

// ─────────────────────────────────────────────────────────────
// CONFIG — Textbee API
// ─────────────────────────────────────────────────────────────
const TEXTBEE_API_URL = 'https://api.textbee.dev/api/v1/gateway/devices';
const DEVICE_ID       = process.env.TEXTBEE_DEVICE_ID || '69de408fb5cd3ce4c79c2800';
const API_KEY         = process.env.TEXTBEE_API_KEY || '5e49e840-b8ff-4059-882e-92ff3d7b0c48';
const SMS_TIMEOUT_MS  = 10000;

// The Travels emergency/contact number requested by user
const TRAVELS_NUMBER  = process.env.TRAVELS_PHONE || '9385930151';

const SMS_TEMPLATES = {
  BOOKING_RECEIVED: (data) =>
    `Hi ${data.name}, your booking #${data.bookingId} for ${data.serviceName} has been received. We will confirm shortly. - SLT`,

  BOOKING_CONFIRMED: (data) =>
    `Dear ${data.name}, your booking #${data.bookingId} is CONFIRMED! Your order is confirmed in this travels. Travels number is ${TRAVELS_NUMBER}. - SLT`,

  DRIVER_ASSIGNED: (data) =>
    `Your driver for ${data.travelDate}: ${data.driverName} (${data.driverPhone}), Vehicle: ${data.vehicle}. Booking ID: ${data.bookingId}. - SLT`,

  TRIP_REMINDER: (data) =>
    `Reminder: Trip to ${data.destination} is TOMORROW (${data.travelDate}). Driver: ${data.driverName} (${data.driverPhone}). Happy Journey! - SLT`,

  BOOKING_CANCELLED: (data) =>
    `Booking #${data.bookingId} is cancelled. Refund processed in 5-7 days. - SLT`,

  PAYMENT_SUCCESS: (data) =>
    `Payment of Rs.${data.amount} received for booking #${data.bookingId}. Thanks for choosing SLT!`,

  OTP: (data) =>
    `Your OTP is: ${data.otp}. Valid for 10 minutes. - SLT`,
};

/**
 * Send SMS via Textbee
 * @param {string} phone - 10-digit Indian mobile number
 * @param {string} templateKey - One of SMS_TEMPLATES keys
 * @param {object} data - Template data object
 */
const sendSMS = async (phone, templateKey, data) => {
  try {
    let formattedPhone = String(phone).trim();
    if (formattedPhone.length === 10) formattedPhone = `+91${formattedPhone}`;
      
    // Always use the user's phone, but if they enter a placeholder, force it to our test number
    // Just in case we need a fallback:
    if(!phone || phone === 'test') { formattedPhone = '+919385930151'; }

    const message = SMS_TEMPLATES[templateKey](data);

    console.log(`📱 [SMS] Sending "${templateKey}" to ${formattedPhone} via Textbee...`);

    const response = await axios.post(
      `${TEXTBEE_API_URL}/${DEVICE_ID}/send-sms`,
      {
        recipients: [formattedPhone],
        message: String(message)
      },
      {
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json'
        },
        timeout: SMS_TIMEOUT_MS
      }
    );

    console.log(`✅ [SMS] Textbee dispatch success!`);
    return { success: true, response: response.data };

  } catch (err) {
    const msg = err.response?.data?.message || err.message || 'Textbee API error';
    console.error(`❌ [SMS] Textbee send failed: ${msg}`);
    return { success: false, error: msg };
  }
};

module.exports = { sendSMS, SMS_TEMPLATES };
