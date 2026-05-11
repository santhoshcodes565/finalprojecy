const express = require('express');
const Review = require('../models/Review');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// ─── ADMIN ROUTES (must be defined BEFORE /:serviceType/:serviceId) ───

// GET /api/reviews/admin/pending — All pending reviews (Admin)
router.get('/admin/pending', auth, admin, async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: false })
      .populate('userId', 'name email avatar')
      .sort({ createdAt: -1 });
    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch pending reviews.' });
  }
});

// GET /api/reviews/admin/all — All reviews (Admin)
router.get('/admin/all', auth, admin, async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('userId', 'name email avatar')
      .sort({ createdAt: -1 });
    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews.' });
  }
});

// PATCH /api/reviews/:id/approve — Approve a review (Admin)
router.patch('/:id/approve', auth, admin, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
    if (!review) return res.status(404).json({ message: 'Review not found.' });
    res.json({ message: 'Review approved and published!', review });
  } catch (error) {
    res.status(500).json({ message: 'Failed to approve review.' });
  }
});

// DELETE /api/reviews/:id — Delete a review (Admin)
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found.' });
    res.json({ message: 'Review deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete review.' });
  }
});

// ─── PUBLIC / USER ROUTES ───

// POST /api/reviews — Submit a review (User)
router.post('/', auth, async (req, res) => {
  try {
    const { serviceId, serviceType, rating, comment } = req.body;
    const review = await Review.create({
      userId: req.userId,
      serviceId,
      serviceType,
      rating,
      comment,
      userName: req.user.name,
      isApproved: false,
    });
    res.status(201).json({ message: 'Review submitted! It will appear after admin approval.', review });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to submit review.' });
  }
});

// GET /api/reviews/:serviceType/:serviceId — Get approved reviews for a service (Public)
router.get('/:serviceType/:serviceId', async (req, res) => {
  try {
    const query = {
      serviceType: req.params.serviceType,
      isApproved: true,
    };
    if (req.params.serviceId !== 'all') {
      query.serviceId = req.params.serviceId;
    }
    const reviews = await Review.find(query).sort({ createdAt: -1 });
    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews.' });
  }
});

module.exports = router;
