/**
 * smsGateway.js
 * Node.js / Express integration helper for Sri Lakshmi SMS Gateway.
 * Drop this file in your backend/utils/ folder and import wherever needed.
 *
 * Usage:
 *   const { sendSMS, sendBulkSMS } = require('./utils/smsGateway');
 *   await sendSMS('9876543210', 'Your booking is confirmed!');
 */

const axios = require('axios');

// ─────────────────────────────────────────────────────────────
// CONFIG — Textbee API
// ─────────────────────────────────────────────────────────────
const TEXTBEE_API_URL = 'https://api.textbee.dev/api/v1/gateway/devices';
const DEVICE_ID       = process.env.TEXTBEE_DEVICE_ID || '69de408fb5cd3ce4c79c2800';
const API_KEY         = process.env.TEXTBEE_API_KEY || '5e49e840-b8ff-4059-882e-92ff3d7b0c48';
const SMS_TIMEOUT_MS  = 10000; // 10 second timeout

// ─────────────────────────────────────────────────────────────
// SEND SINGLE SMS (Via Textbee)
// ─────────────────────────────────────────────────────────────
/**
 * Send a single SMS via your Android phone using Textbee.
 * @param {string} phone   - 10-digit Indian mobile number
 * @param {string} message - SMS text
 * @returns {Promise<{success: boolean, id?: string, error?: string}>}
 */
async function sendSMS(phone, message) {
  try {
    // Ensure phone number starts with +91 if lacking
    let formattedPhone = String(phone).trim();
    if (formattedPhone.length === 10) formattedPhone = `+91${formattedPhone}`;

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

    console.log(`[SMS] ✓ Sent via Textbee Android: ${formattedPhone}`);
    return { success: true, response: response.data };

  } catch (err) {
    const msg = err.response?.data?.message || err.message || 'Textbee API unreachable';
    console.error(`[SMS] ✗ Error: ${msg}`);
    return { success: false, error: msg };
  }
}

// ─────────────────────────────────────────────────────────────
// SEND BULK SMS (Via Textbee)
// ─────────────────────────────────────────────────────────────
/**
 * Send SMS to multiple recipients.
 * @param {Array<{phone: string, message: string}>} recipients
 * @returns {Promise<{success: boolean}>}
 */
async function sendBulkSMS(recipients) {
  // Textbee bulk is essentially calling sendSMS in a loop or batching recipients for same message
  // For multiple unique messages, we will fire them in parallel
  try {
    const promises = recipients.map(req => sendSMS(req.phone, req.message));
    await Promise.allSettled(promises);
    console.log(`[SMS BULK] Dispatched ${recipients.length} messages to Textbee.`);
    return { success: true, total: recipients.length };
  } catch (err) {
    console.error(`[SMS BULK] Error: ${err.message}`);
    return { success: false, error: err.message };
  }
}

// ─────────────────────────────────────────────────────────────
// GET SMS STATUS BY ID
// ─────────────────────────────────────────────────────────────
/**
 * Check delivery status of a specific SMS.
 * @param {string} smsId - The SMS ID returned by sendSMS()
 * @returns {Promise<{status: string, phone: string, ...}>}
 */
async function getSMSStatus(smsId) {
  try {
    const response = await axios.get(`${SMS_GATEWAY_URL}/api/sms/${smsId}`, {
      timeout: SMS_TIMEOUT_MS
    });
    return response.data;
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// ─────────────────────────────────────────────────────────────
// PRE-BUILT MESSAGE TEMPLATES for Sri Lakshmi Travels
// ─────────────────────────────────────────────────────────────
const SMS_TEMPLATES = {

  bookingConfirmed: (name, bookingId, date) =>
    `Sri Lakshmi Travels: Hello ${name}! Your booking #${bookingId} is confirmed for ${date}. Thank you for choosing us.`,

  bookingCancelled: (name, bookingId) =>
    `Sri Lakshmi Travels: Your booking #${bookingId} has been cancelled. We hope to serve you again soon, ${name}.`,

  paymentReceived: (name, amount, bookingId) =>
    `Sri Lakshmi Travels: Payment of Rs.${amount} received for booking #${bookingId}. Thank you, ${name}!`,

  driverAssigned: (name, driverName, driverPhone, vehicle) =>
    `Sri Lakshmi Travels: Hi ${name}! Your driver ${driverName} (${driverPhone}) in ${vehicle} has been assigned to your booking.`,

  tripReminder: (name, date, time) =>
    `Sri Lakshmi Travels: Reminder! Your trip is scheduled for ${date} at ${time}. Please be ready. Safe journey, ${name}!`,

  otp: (otp) =>
    `Sri Lakshmi Travels: Your OTP is ${otp}. Valid for 10 minutes. Do not share this with anyone.`,

  reviewRequest: (name, bookingId) =>
    `Sri Lakshmi Travels: Thank you for traveling with us, ${name}! Please share your feedback for booking #${bookingId}. We value your opinion.`,
};

module.exports = {
  sendSMS,
  sendBulkSMS,
  getSMSStatus,
  SMS_TEMPLATES
};
