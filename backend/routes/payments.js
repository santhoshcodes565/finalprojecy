const express = require('express');
const Payment = require('../models/Payment');
const PaymentLog = require('../models/PaymentLog');
const User = require('../models/User');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { generateTransactionId } = require('../utils/transactionUtils');
// Keep notification service for success logging if needed
const { notify } = require('../services/notificationService');

// Specific booking models to update their status
const CarBooking = require('../models/CarBooking');
const DriverBooking = require('../models/DriverBooking');
const PackageBooking = require('../models/PackageBooking');

const router = express.Router();

/**
 * POST /api/payments/initiate - Strict Backend Architecture
 * Step 1: Create an INITIATED payment record
 */
router.post('/initiate', auth, async (req, res) => {
  try {
    const { amount, bookingId, bookingType } = req.body;

    if (!amount || amount <= 0 || !bookingId) {
      return res.status(400).json({ message: 'Invalid payment initiation parameters.' });
    }

    // Create payment in INITIATED state
    const payment = await Payment.create({
      userId: req.userId,
      bookingId,
      bookingType: bookingType || 'general',
      amount,
      method: 'card',
      status: 'INITIATED',
      isVerified: false
    });

    // Audit log
    await PaymentLog.create({
      paymentId: payment._id,
      action: 'INITIATED',
      metadata: { bookingId, amount }
    });

    res.status(201).json({
      message: 'Payment initiated.',
      paymentId: payment._id
    });
  } catch (error) {
    console.error('Initiate payment error:', error.message);
    res.status(500).json({ message: 'Failed to initiate payment.' });
  }
});

/**
 * POST /api/payments/verify - Strict Backend Authority Rules
 * Step 2: Validate card rules and update Payment & Booking statuses
 */
router.post('/verify', auth, async (req, res) => {
  try {
    const { paymentId, cardNumber, expiry, cvv } = req.body;

    if (!paymentId || !cardNumber || !expiry || !cvv) {
      return res.status(400).json({ message: 'Missing payment verification data.' });
    }

    const payment = await Payment.findOne({ _id: paymentId, userId: req.userId });
    if (!payment) {
      return res.status(404).json({ message: 'Payment record not found.' });
    }

    // Idempotency: If already SUCCESS, return immediately
    if (payment.status === 'SUCCESS') {
      return res.json({ message: 'Payment already verified.', payment });
    }

    // Mark as PROCESSING
    payment.status = 'PROCESSING';
    await payment.save();
    await PaymentLog.create({ paymentId, action: 'PROCESSING', metadata: { last4: cardNumber.slice(-4) } });

    // --- TEST LOGIC ---
    let isSuccess = true;
    let failureReason = null;
    
    const formattedCard = cardNumber.replace(/\s/g, '');

    // Card Rule 1: 4000 0000 0000 0002 -> FAILED
    if (formattedCard === '4000000000000002') {
      isSuccess = false;
      failureReason = 'Card declined by bank.';
    }
    // Card Rule 2: CVV 000 -> FAILED
    else if (cvv === '000') {
      isSuccess = false;
      failureReason = 'Invalid CVV.';
    }
    // Card Rule 3: Expired Card -> FAILED
    else {
      const [month, year] = expiry.split('/');
      const expDate = new Date(`20${year}`, month - 1);
      const today = new Date();
      if (expDate < today) {
        isSuccess = false;
        failureReason = 'Card is expired.';
      }
    }
    
    // Optional 10% random failure on non-test cards
    if (isSuccess && formattedCard !== '4242424242424242') {
      if (Math.random() < 0.1) {
        isSuccess = false;
        failureReason = 'Network error simulated. Try again.';
      }
    }

    // --- END TEST LOGIC ---

    if (isSuccess) {
      payment.status = 'SUCCESS';
      payment.isVerified = true;
      payment.transactionId = generateTransactionId();
      await payment.save();

      await PaymentLog.create({ 
        paymentId, 
        action: 'SUCCESS', 
        metadata: { transactionId: payment.transactionId } 
      });

      // Update actual booking
      let bookingModel;
      if (payment.bookingType === 'car') bookingModel = CarBooking;
      else if (payment.bookingType === 'driver') bookingModel = DriverBooking;
      else if (payment.bookingType === 'package') bookingModel = PackageBooking;
      
      if (bookingModel) {
        await bookingModel.findByIdAndUpdate(payment.bookingId, { paymentStatus: 'Success' }).catch(e => console.log('Booking update soft-fail (ignore if ID missing):', e.message));
      }

      // Notify User
      const user = await User.findById(req.userId);
      if (user) {
        notify(user, {
          _id: payment.bookingId,
          bookingId: payment.bookingId.toString().slice(-8).toUpperCase(),
          serviceName: payment.bookingType,
          totalAmount: payment.amount,
          paidAmount: payment.amount,
        }, 'PAYMENT_SUCCESS', {
          amount: payment.amount,
          transactionId: payment.transactionId,
          method: 'card', 
        }).catch(err => console.error('Notify err:', err.message));
      }

      return res.json({ status: 'SUCCESS', transactionId: payment.transactionId, message: 'Payment successful.' });

    } else {
      payment.status = 'FAILED';
      await payment.save();

      await PaymentLog.create({ paymentId, action: 'FAILED', metadata: { reason: failureReason } });
      
      // We do NOT update the booking to 'failed' because they can retry with the same bookingId

      return res.status(400).json({ status: 'FAILED', message: failureReason });
    }

  } catch (error) {
    console.error('Verify payment error:', error.message);
    res.status(500).json({ status: 'FAILED', message: 'Internal validation error.' });
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
      .filter(p => p.status === 'SUCCESS')
      .reduce((sum, p) => sum + p.amount, 0);

    res.json({ payments, total: payments.length, totalRevenue });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch payments.' });
  }
});

/**
 * POST /api/payments/advance-confirm
 * Marks an INITIATED payment as SUCCESS without card validation.
 * Used for advance/UPI payments confirmed by screenshot upload.
 */
router.post('/advance-confirm', auth, async (req, res) => {
  try {
    const { paymentId, method } = req.body;

    if (!paymentId) {
      return res.status(400).json({ message: 'Payment ID is required.' });
    }

    const payment = await Payment.findOne({ _id: paymentId, userId: req.userId });
    if (!payment) {
      return res.status(404).json({ message: 'Payment record not found.' });
    }

    // Idempotency: already confirmed
    if (payment.status === 'SUCCESS') {
      return res.json({ message: 'Payment already confirmed.', payment });
    }

    payment.status = 'SUCCESS';
    payment.isVerified = true;
    payment.method = method || 'upi';
    payment.transactionId = generateTransactionId();
    await payment.save();

    await PaymentLog.create({
      paymentId: payment._id,
      action: 'SUCCESS',
      metadata: { method: payment.method, source: 'advance_screenshot', transactionId: payment.transactionId }
    });

    // Update the booking's payment status
    let bookingModel;
    if (payment.bookingType === 'car') bookingModel = CarBooking;
    else if (payment.bookingType === 'driver') bookingModel = DriverBooking;
    else if (payment.bookingType === 'package') bookingModel = PackageBooking;

    if (bookingModel) {
      await bookingModel.findByIdAndUpdate(payment.bookingId, { paymentStatus: 'Success' })
        .catch(e => console.log('Booking payment status update soft-fail:', e.message));
    }

    return res.json({
      status: 'SUCCESS',
      transactionId: payment.transactionId,
      message: 'Advance payment confirmed.'
    });

  } catch (error) {
    console.error('Advance confirm error:', error.message);
    res.status(500).json({ message: 'Failed to confirm advance payment.' });
  }
});

module.exports = router;
