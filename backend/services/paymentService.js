/**
 * Payment Service — Razorpay Integration for Sri Lakshmi Travels
 * Handles order creation and payment verification
 */
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay instance (test/live keys from env)
let razorpay;
try {
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
} catch (err) {
  console.warn('⚠️ Razorpay init failed:', err.message);
}

/**
 * Create a Razorpay order
 * @param {number} amount - Amount in INR (will be converted to paise)
 * @param {string} bookingId - Reference booking ID
 * @param {object} notes - Additional metadata
 * @returns {object} Razorpay order object
 */
const createOrder = async (amount, bookingId, notes = {}) => {
  if (!razorpay) {
    // Dev mode — return mock order
    console.log(`💳 [PAYMENT-DEV] Would create order for ₹${amount} (Booking: ${bookingId})`);
    return {
      id: `order_dev_${Date.now()}`,
      amount: amount * 100,
      currency: 'INR',
      receipt: bookingId,
      status: 'created',
      dev: true,
    };
  }

  const order = await razorpay.orders.create({
    amount: amount * 100, // Razorpay expects paise
    currency: 'INR',
    receipt: bookingId,
    notes: {
      bookingId,
      ...notes,
    },
  });

  console.log(`✅ Razorpay order created: ${order.id} for ₹${amount}`);
  return order;
};

/**
 * Verify Razorpay payment signature
 * @param {string} orderId - Razorpay order ID
 * @param {string} paymentId - Razorpay payment ID
 * @param {string} signature - Razorpay signature
 * @returns {boolean} Whether signature is valid
 */
const verifyPayment = (orderId, paymentId, signature) => {
  if (!process.env.RAZORPAY_KEY_SECRET) {
    console.log('💳 [PAYMENT-DEV] Signature verification skipped (dev mode)');
    return true;
  }

  const body = orderId + '|' + paymentId;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  return expectedSignature === signature;
};

module.exports = { createOrder, verifyPayment };
