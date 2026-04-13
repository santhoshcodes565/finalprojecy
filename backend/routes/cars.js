const express = require('express');
const Car = require('../models/Car');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// GET /api/cars — List all available cars (Public)
router.get('/', async (req, res) => {
  try {
    const { category, minSeats, search, all } = req.query;
    // If all=true passed (admin panel use), show ALL cars regardless of availability
    const filter = all === 'true' ? {} : { isAvailable: true };

    if (category) filter.category = { $regex: category, $options: 'i' };
    if (minSeats) filter.seats = { $gte: Number(minSeats) };
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    const cars = await Car.find(filter).sort({ createdAt: -1 });
    res.json({ cars });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cars.' });
  }
});

// GET /api/cars/:id — Get single car (Public)
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found.' });
    res.json({ car });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch car.' });
  }
});

// POST /api/cars — Add car (Admin)
router.post('/', auth, admin, async (req, res) => {
  try {
    const car = await Car.create(req.body);
    res.status(201).json({ message: 'Car added successfully!', car });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to add car.' });
  }
});

// PUT /api/cars/:id — Update car (Admin)
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!car) return res.status(404).json({ message: 'Car not found.' });
    res.json({ message: 'Car updated!', car });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to update car.' });
  }
});

// DELETE /api/cars/:id — Remove car (Admin)
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, { isAvailable: false }, { new: true });
    if (!car) return res.status(404).json({ message: 'Car not found.' });
    res.json({ message: 'Car removed from listings.', car });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove car.' });
  }
});

module.exports = router;
