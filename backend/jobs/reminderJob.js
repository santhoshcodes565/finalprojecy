/**
 * 24-Hour Trip Reminder Cron Job — Sri Lakshmi Travels
 * Runs daily at 9:00 AM IST, finds tomorrow's confirmed/assigned bookings,
 * and sends reminder SMS + Email to each user.
 */
const cron = require('node-cron');
const CarBooking = require('../models/CarBooking');
const DriverBooking = require('../models/DriverBooking');
const PackageBooking = require('../models/PackageBooking');
const User = require('../models/User');
const { notify } = require('../services/notificationService');

const startReminderJob = () => {
  // 9:00 AM IST = 3:30 AM UTC → cron: '30 3 * * *'
  cron.schedule('30 3 * * *', async () => {
    console.log('⏰ Running 24-hour trip reminder job...');

    try {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const startOfTomorrow = new Date(tomorrow);
      startOfTomorrow.setHours(0, 0, 0, 0);

      const endOfTomorrow = new Date(tomorrow);
      endOfTomorrow.setHours(23, 59, 59, 999);

      const dateFilter = {
        status: { $in: ['confirmed', 'assigned'] },
      };

      // Query all three booking types for tomorrow's travel dates
      const [carBookings, driverBookings, packageBookings] = await Promise.all([
        CarBooking.find({
          ...dateFilter,
          pickupDate: { $gte: startOfTomorrow, $lte: endOfTomorrow },
        }).populate('userId assignedDriver'),

        DriverBooking.find({
          ...dateFilter,
          pickupDate: { $gte: startOfTomorrow, $lte: endOfTomorrow },
        }).populate('userId assignedDriver'),

        PackageBooking.find({
          ...dateFilter,
          travelDate: { $gte: startOfTomorrow, $lte: endOfTomorrow },
        }).populate('userId assignedDriver'),
      ]);

      const allBookings = [
        ...carBookings.map(b => ({ booking: b, user: b.userId })),
        ...driverBookings.map(b => ({ booking: b, user: b.userId })),
        ...packageBookings.map(b => ({ booking: b, user: b.userId })),
      ];

      console.log(`   Found ${allBookings.length} bookings for tomorrow.`);

      for (const { booking, user } of allBookings) {
        if (!user) continue;

        const driverData = booking.assignedDriver
          ? { driverName: booking.assignedDriver.name, driverPhone: booking.assignedDriver.phone }
          : {};

        await notify(user, booking, 'TRIP_REMINDER', driverData);
      }

      console.log(`✅ Reminders sent for ${allBookings.length} bookings.`);
    } catch (error) {
      console.error('❌ Reminder job error:', error.message);
    }
  }, {
    timezone: 'Asia/Kolkata',
  });

  console.log('📅 Trip reminder cron job scheduled (daily at 9:00 AM IST)');
};

module.exports = startReminderJob;
