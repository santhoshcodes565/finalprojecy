const express = require('express');
const Tour = require('../models/Tour');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// GET /api/tours — List all active tours (Public)
router.get('/', async (req, res) => {
  try {
    const { states, minPrice, maxPrice, duration, search, all } = req.query;
    // If all=true passed (admin panel), show ALL tours regardless of isActive
    const filter = all === 'true' ? {} : { isActive: true };

    if (states) filter.states = { $regex: states, $options: 'i' };
    if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };
    if (duration) filter.duration = { $regex: duration, $options: 'i' };
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { destination: { $regex: search, $options: 'i' } },
      ];
    }

    const tours = await Tour.find(filter).sort({ createdAt: -1 });
    res.json({ tours });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tours.' });
  }
});

// GET /api/tours/:id — Get single tour (Public)
router.get('/:id', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: 'Tour not found.' });
    res.json({ tour });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tour.' });
  }
});

// POST /api/tours — Create tour (Admin)
router.post('/', auth, admin, async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    res.status(201).json({ message: 'Tour created successfully!', tour });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to create tour.' });
  }
});

// PUT /api/tours/:id — Update tour (Admin)
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!tour) return res.status(404).json({ message: 'Tour not found.' });
    res.json({ message: 'Tour updated successfully!', tour });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to update tour.' });
  }
});

// DELETE /api/tours/:id — Deactivate tour (Admin)
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!tour) return res.status(404).json({ message: 'Tour not found.' });
    res.json({ message: 'Tour deactivated.', tour });
  } catch (error) {
    res.status(500).json({ message: 'Failed to deactivate tour.' });
  }
});

module.exports = router;
