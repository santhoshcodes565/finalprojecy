const express = require('express');
const Driver = require('../models/Driver');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// GET /api/drivers — List all available drivers (Public)
router.get('/', async (req, res) => {
  try {
    const { language, minRating, search } = req.query;
    const filter = { isAvailable: true };

    if (language) filter.languages = { $in: [new RegExp(language, 'i')] };
    if (minRating) filter.rating = { $gte: Number(minRating) };
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { bio: { $regex: search, $options: 'i' } },
      ];
    }

    const drivers = await Driver.find(filter).sort({ rating: -1 });
    res.json({ drivers });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch drivers.' });
  }
});

// GET /api/drivers/:id — Get single driver (Public)
router.get('/:id', async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) return res.status(404).json({ message: 'Driver not found.' });
    res.json({ driver });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch driver.' });
  }
});

// POST /api/drivers — Add driver (Admin)
router.post('/', auth, admin, async (req, res) => {
  try {
    const driver = await Driver.create(req.body);
    res.status(201).json({ message: 'Driver added successfully!', driver });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to add driver.' });
  }
});

// PUT /api/drivers/:id — Update driver (Admin)
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!driver) return res.status(404).json({ message: 'Driver not found.' });
    res.json({ message: 'Driver updated!', driver });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to update driver.' });
  }
});

// DELETE /api/drivers/:id — Remove driver (Admin)
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(req.params.id, { isAvailable: false }, { new: true });
    if (!driver) return res.status(404).json({ message: 'Driver not found.' });
    res.json({ message: 'Driver removed from listings.', driver });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove driver.' });
  }
});

module.exports = router;
