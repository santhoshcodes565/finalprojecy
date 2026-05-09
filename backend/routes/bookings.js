/**
 * Booking Routes — Sri Lakshmi Travels
 * Handles car, driver, and package bookings for users and admins.
 * Triggers SMS + Email + In-app notifications on every status change.
 */
const express = require('express');
const CarBooking = require('../models/CarBooking');
const DriverBooking = require('../models/DriverBooking');
const PackageBooking = require('../models/PackageBooking');
const User = require('../models/User');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { notify } = require('../services/notificationService');

const router = express.Router();

// Helper to get the right model
const getModel = (type) => {
  if (type === 'car') return CarBooking;
  if (type === 'driver') return DriverBooking;
  if (type === 'package') return PackageBooking;
  return null;
};

// ─── USER ENDPOINTS ──────────────────────────────────────

// POST /api/bookings/car — Create car booking
router.post('/car', auth, async (req, res) => {
  try {
    const booking = await CarBooking.create({ ...req.body, userId: req.userId });

    // Trigger BOOKING_RECEIVED notification (SMS + Email + In-app)
    const user = await User.findById(req.userId);
    if (user) {
      notify(user, booking, 'BOOKING_RECEIVED').catch(err =>
        console.error('Notification error:', err.message)
      );
    }

    res.status(201).json({ message: 'Car booking created!', booking });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to create booking.' });
  }
});

// POST /api/bookings/driver — Create driver booking
router.post('/driver', auth, async (req, res) => {
  try {
    const booking = await DriverBooking.create({ ...req.body, userId: req.userId });

    const user = await User.findById(req.userId);
    if (user) {
      notify(user, booking, 'BOOKING_RECEIVED').catch(err =>
        console.error('Notification error:', err.message)
      );
    }

    res.status(201).json({ message: 'Driver booking created!', booking });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to create booking.' });
  }
});

// POST /api/bookings/package — Create package booking
router.post('/package', auth, async (req, res) => {
  try {
    const booking = await PackageBooking.create({ ...req.body, userId: req.userId });

    const user = await User.findById(req.userId);
    if (user) {
      notify(user, booking, 'BOOKING_RECEIVED').catch(err =>
        console.error('Notification error:', err.message)
      );
    }

    res.status(201).json({ message: 'Package booking created!', booking });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to create booking.' });
  }
});

// GET /api/bookings/mine — All bookings for logged-in user
router.get('/mine', auth, async (req, res) => {
  try {
    const [cars, drivers, packages] = await Promise.all([
      CarBooking.find({ userId: req.userId }).populate('assignedDriver', 'name phone').sort({ createdAt: -1 }),
      DriverBooking.find({ userId: req.userId }).populate('assignedDriver', 'name phone').sort({ createdAt: -1 }),
      PackageBooking.find({ userId: req.userId }).populate('assignedDriver', 'name phone').sort({ createdAt: -1 }),
    ]);

    const bookings = [
      ...cars.map((b) => ({ ...b.toObject(), type: 'car' })),
      ...drivers.map((b) => ({ ...b.toObject(), type: 'driver' })),
      ...packages.map((b) => ({ ...b.toObject(), type: 'package' })),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings.' });
  }
});

// PATCH /api/bookings/:type/:id/cancel — User cancels own booking
router.patch('/:type/:id/cancel', auth, async (req, res) => {
  try {
    const Model = getModel(req.params.type);
    if (!Model) return res.status(400).json({ message: 'Invalid booking type.' });

    const booking = await Model.findOne({ _id: req.params.id, userId: req.userId });
    if (!booking) return res.status(404).json({ message: 'Booking not found.' });
    if (!['pending', 'confirmed'].includes(booking.status)) {
      return res.status(400).json({ message: 'This booking cannot be cancelled.' });
    }

    booking.status = 'cancelled';
    await booking.save();

    // Trigger BOOKING_CANCELLED notification
    const user = await User.findById(req.userId);
    if (user) {
      notify(user, booking, 'BOOKING_CANCELLED').catch(err =>
        console.error('Notification error:', err.message)
      );
    }

    res.json({ message: 'Booking cancelled successfully.', booking });
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel booking.' });
  }
});

// ─── ADMIN ENDPOINTS ─────────────────────────────────────

// GET /api/bookings/all — All bookings across all types (Admin)
router.get('/all', auth, admin, async (req, res) => {
  try {
    const { status, type, search } = req.query;

    const buildFilter = (extraFilter = {}) => {
      const filter = { ...extraFilter };
      if (status) filter.status = status;
      if (search) {
        filter.$or = [
          { fullName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } },
        ];
      }
      return filter;
    };

    let bookings = [];

    if (!type || type === 'car') {
      const cars = await CarBooking.find(buildFilter()).populate('userId', 'name email').populate('assignedDriver', 'name phone').sort({ createdAt: -1 });
      bookings.push(...cars.map((b) => ({ ...b.toObject(), type: 'car' })));
    }
    if (!type || type === 'driver') {
      const drivers = await DriverBooking.find(buildFilter()).populate('userId', 'name email').populate('assignedDriver', 'name phone').sort({ createdAt: -1 });
      bookings.push(...drivers.map((b) => ({ ...b.toObject(), type: 'driver' })));
    }
    if (!type || type === 'package') {
      const packages = await PackageBooking.find(buildFilter()).populate('userId', 'name email').populate('assignedDriver', 'name phone').sort({ createdAt: -1 });
      bookings.push(...packages.map((b) => ({ ...b.toObject(), type: 'package' })));
    }

    bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ bookings, total: bookings.length });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings.' });
  }
});

// PATCH /api/bookings/:type/:id/status — Admin updates booking status
router.patch('/:type/:id/status', auth, admin, async (req, res) => {
  try {
    const Model = getModel(req.params.type);
    if (!Model) return res.status(400).json({ message: 'Invalid booking type.' });

    const newStatus = req.body.status;
    const booking = await Model.findByIdAndUpdate(
      req.params.id,
      { status: newStatus },
      { new: true, runValidators: true }
    ).populate('userId');

    if (!booking) return res.status(404).json({ message: 'Booking not found.' });

    // Trigger notification based on status change
    const user = booking.userId;
    if (user) {
      const eventMap = {
        confirmed: 'BOOKING_CONFIRMED',
        cancelled: 'BOOKING_CANCELLED',
        completed: 'TRIP_COMPLETED',
      };
      const eventType = eventMap[newStatus];
      if (eventType) {
        notify(user, booking, eventType).catch(err =>
          console.error('Notification error:', err.message)
        );
      }
    }

    res.json({ message: `Booking status updated to "${newStatus}".`, booking });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update booking status.' });
  }
});

// DELETE /api/bookings/:type/:id — Admin deletes booking
router.delete('/:type/:id', auth, admin, async (req, res) => {
  try {
    const Model = getModel(req.params.type);
    if (!Model) return res.status(400).json({ message: 'Invalid booking type.' });

    const booking = await Model.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found.' });

    res.json({ message: 'Booking deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete booking.' });
  }
});

// PATCH /api/bookings/:type/:id/assign — Admin assigns driver
router.patch('/:type/:id/assign', auth, admin, async (req, res) => {
  try {
    const Model = getModel(req.params.type);
    if (!Model) return res.status(400).json({ message: 'Invalid booking type.' });

    const booking = await Model.findByIdAndUpdate(
      req.params.id,
      {
        assignedDriver: req.body.driverId,
        assignedVehicle: req.body.vehicle || undefined,
        status: 'assigned',
      },
      { new: true }
    ).populate('assignedDriver', 'name phone').populate('userId');

    if (!booking) return res.status(404).json({ message: 'Booking not found.' });

    // Trigger DRIVER_ASSIGNED notification
    const user = booking.userId;
    if (user && booking.assignedDriver) {
      notify(user, booking, 'DRIVER_ASSIGNED', {
        driverName: booking.assignedDriver.name,
        driverPhone: booking.assignedDriver.phone,
        vehicle: booking.assignedVehicle || req.body.vehicle || 'To be confirmed',
      }).catch(err =>
        console.error('Notification error:', err.message)
      );
    }

    res.json({ message: 'Driver assigned successfully.', booking });
  } catch (error) {
    res.status(500).json({ message: 'Failed to assign driver.' });
  }
});

module.exports = router;
