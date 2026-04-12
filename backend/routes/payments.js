/**
 * Payment Routes — Sri Lakshmi Travels
 * Razorpay payment gateway integration + payment history
 */
const express = require('express');
const Payment = require('../models/Payment');
const User = require('../models/User');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { createOrder, verifyPayment } = require('../services/paymentService');
const { notify } = require('../services/notificationService');

const router = express.Router();

// POST /api/payments/create-order — Create Razorpay order
router.post('/create-order', auth, async (req, res) => {
  try {
    const { amount, bookingId, bookingType, paymentType } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount.' });
    }

    const order = await createOrder(amount, bookingId || `SLT-${Date.now()}`, {
      userId: req.userId.toString(),
      bookingType: bookingType || 'general',
      paymentType: paymentType || 'full',
    });

    // Save pending payment record
    const payment = await Payment.create({
      userId: req.userId,
      bookingId,
      bookingType: bookingType || 'general',
      razorpayOrderId: order.id,
      amount,
      method: 'online',
      status: 'created',
      paymentType: paymentType || 'full',
    });

    res.json({
      message: 'Order created.',
      order,
      payment,
      key: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
    });
  } catch (error) {
    console.error('Create order error:', error.message);
    res.status(500).json({ message: 'Failed to create payment order.' });
  }
});

// POST /api/payments/verify — Verify Razorpay payment signature
router.post('/verify', auth, async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, bookingId, bookingType } = req.body;

    // Verify signature
    const isValid = verifyPayment(razorpayOrderId, razorpayPaymentId, razorpaySignature);
    if (!isValid) {
      // Update payment as failed
      await Payment.findOneAndUpdate(
        { razorpayOrderId },
        { status: 'failed' }
      );
      return res.status(400).json({ message: 'Payment verification failed. Invalid signature.' });
    }

    // Update payment record
    const payment = await Payment.findOneAndUpdate(
      { razorpayOrderId },
      {
        razorpayPaymentId,
        razorpaySignature,
        status: 'paid',
      },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: 'Payment record not found.' });
    }

    // Trigger PAYMENT_SUCCESS notification
    const user = await User.findById(req.userId);
    if (user) {
      notify(user, {
        _id: bookingId || payment.bookingId,
        bookingId: bookingId || payment._id.toString().slice(-8).toUpperCase(),
        serviceName: bookingType || 'Travel Service',
        totalAmount: payment.amount,
        paidAmount: payment.amount,
      }, 'PAYMENT_SUCCESS', {
        amount: payment.amount,
        razorpayPaymentId,
        method: payment.method,
        paymentType: payment.paymentType,
      }).catch(err => console.error('Payment notification error:', err.message));
    }

    res.json({
      message: 'Payment verified successfully!',
      payment,
    });
  } catch (error) {
    console.error('Verify payment error:', error.message);
    res.status(500).json({ message: 'Payment verification failed.' });
  }
});

// GET /api/payments/my — User's payment history
router.get('/my', auth, async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ payments });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch payment history.' });
  }
});

// GET /api/payments — All transactions (Admin)
router.get('/', auth, admin, async (req, res) => {
  try {
    const { status, method } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (method) filter.method = method;

    const payments = await Payment.find(filter)
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });

    const totalRevenue = payments
      .filter(p => p.status === 'paid')
      .reduce((sum, p) => sum + p.amount, 0);

    res.json({ payments, total: payments.length, totalRevenue });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch payments.' });
  }
});

// POST /api/payments — Record a manual payment (backward compat)
router.post('/', auth, async (req, res) => {
  try {
    const payment = await Payment.create({ ...req.body, userId: req.userId });
    res.status(201).json({ message: 'Payment recorded.', payment });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to record payment.' });
  }
});

module.exports = router;
