const express = require('express');
const User = require('../models/User');
const CarBooking = require('../models/CarBooking');
const DriverBooking = require('../models/DriverBooking');
const PackageBooking = require('../models/PackageBooking');
const Payment = require('../models/Payment');
const Review = require('../models/Review');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// GET /api/dashboard/stats — Dashboard statistics (Admin)
router.get('/stats', auth, admin, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayFilter = { createdAt: { $gte: today, $lt: tomorrow } };

    // Count today's bookings
    const [todayCars, todayDrivers, todayPackages] = await Promise.all([
      CarBooking.countDocuments(todayFilter),
      DriverBooking.countDocuments(todayFilter),
      PackageBooking.countDocuments(todayFilter),
    ]);
    const todayBookings = todayCars + todayDrivers + todayPackages;

    // Total revenue (all time) — only count SUCCESS payments
    const payments = await Payment.find({ status: 'SUCCESS' });
    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

    // Today's revenue — only count SUCCESS payments
    const todayPayments = await Payment.find({
      status: 'SUCCESS',
      createdAt: { $gte: today, $lt: tomorrow },
    });
    const todayRevenue = todayPayments.reduce((sum, p) => sum + p.amount, 0);

    // Active users count
    const totalUsers = await User.countDocuments({ role: 'user' });

    // Pending actions
    const [pendingCars, pendingDrivers, pendingPackages, pendingReviews] = await Promise.all([
      CarBooking.countDocuments({ status: 'pending' }),
      DriverBooking.countDocuments({ status: 'pending' }),
      PackageBooking.countDocuments({ status: 'pending' }),
      Review.countDocuments({ isApproved: false }),
    ]);
    const pendingBookings = pendingCars + pendingDrivers + pendingPackages;

    // Total bookings (all time)
    const [totalCars, totalDrivers, totalPackages] = await Promise.all([
      CarBooking.countDocuments(),
      DriverBooking.countDocuments(),
      PackageBooking.countDocuments(),
    ]);
    const totalBookings = totalCars + totalDrivers + totalPackages;

    res.json({
      todayBookings,
      todayRevenue,
      totalRevenue,
      totalUsers,
      totalBookings,
      pendingBookings,
      pendingReviews,
      pendingActions: pendingBookings + pendingReviews,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch dashboard stats.' });
  }
});

// GET /api/dashboard/recent — Recent bookings (Admin)
router.get('/recent', auth, admin, async (req, res) => {
  try {
    const [cars, drivers, packages] = await Promise.all([
      CarBooking.find().populate('userId', 'name email').sort({ createdAt: -1 }).limit(5),
      DriverBooking.find().populate('userId', 'name email').sort({ createdAt: -1 }).limit(5),
      PackageBooking.find().populate('userId', 'name email').populate('packageId', 'title').sort({ createdAt: -1 }).limit(5),
    ]);

    const bookings = [
      ...cars.map((b) => ({ ...b.toObject(), type: 'car', serviceName: `Car Rental - ${b.carCategory}` })),
      ...drivers.map((b) => ({ ...b.toObject(), type: 'driver', serviceName: `Driver - ${b.driverType}` })),
      ...packages.map((b) => ({ ...b.toObject(), type: 'package', serviceName: b.packageId?.title || 'Tour Package' })),
    ]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);

    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch recent bookings.' });
  }
});

module.exports = router;
