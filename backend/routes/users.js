const express = require('express');
const User = require('../models/User');
const CarBooking = require('../models/CarBooking');
const DriverBooking = require('../models/DriverBooking');
const PackageBooking = require('../models/PackageBooking');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// GET /api/users — List all users (Admin)
router.get('/', auth, admin, async (req, res) => {
  try {
    const { search, role } = req.query;
    const filter = {};

    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const users = await User.find(filter).select('-password').sort({ createdAt: -1 });
    res.json({ users, total: users.length });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users.' });
  }
});

// GET /api/users/:id — Get user details + booking history (Admin)
router.get('/:id', auth, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });

    // Get booking history
    const [carBookings, driverBookings, packageBookings] = await Promise.all([
      CarBooking.find({ userId: req.params.id }).sort({ createdAt: -1 }).limit(10),
      DriverBooking.find({ userId: req.params.id }).sort({ createdAt: -1 }).limit(10),
      PackageBooking.find({ userId: req.params.id }).sort({ createdAt: -1 }).limit(10),
    ]);

    res.json({
      user,
      bookings: {
        car: carBookings,
        driver: driverBookings,
        package: packageBookings,
        totalCount: carBookings.length + driverBookings.length + packageBookings.length,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user details.' });
  }
});

// PATCH /api/users/:id/block — Block/unblock user (Admin)
router.patch('/:id/block', auth, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    if (user.role === 'admin') {
      return res.status(400).json({ message: 'Cannot block an admin account.' });
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.json({
      message: user.isBlocked ? 'User blocked successfully.' : 'User unblocked successfully.',
      user: { id: user._id, name: user.name, isBlocked: user.isBlocked },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user status.' });
  }
});

module.exports = router;
