const mongoose = require('mongoose');
const CarBooking = require('./backend/models/CarBooking');
const DriverBooking = require('./backend/models/DriverBooking');
const PackageBooking = require('./backend/models/PackageBooking');
const Payment = require('./backend/models/Payment');

require('dotenv').config({ path: './backend/.env' });

async function checkBookings() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log('\n--- LATEST CAR BOOKINGS ---');
    const cars = await CarBooking.find().sort({ createdAt: -1 }).limit(3);
    cars.forEach(b => console.log(`[${b.createdAt.toISOString()}] ${b.fullName} - ${b.carCategory} - Status: ${b.status} - Payment: ${b.paymentStatus}`));

    console.log('\n--- LATEST DRIVER BOOKINGS ---');
    const drivers = await DriverBooking.find().sort({ createdAt: -1 }).limit(3);
    drivers.forEach(b => console.log(`[${b.createdAt.toISOString()}] ${b.fullName} - ${b.tripType} - Status: ${b.status} - Payment: ${b.paymentStatus}`));

    console.log('\n--- LATEST PACKAGE BOOKINGS ---');
    const packages = await PackageBooking.find().sort({ createdAt: -1 }).limit(3);
    packages.forEach(b => console.log(`[${b.createdAt.toISOString()}] ${b.fullName} - ${b.tourPackage} - Status: ${b.status} - Payment: ${b.paymentStatus}`));

    console.log('\n--- LATEST DUMMY PAYMENTS ---');
    const payments = await Payment.find().sort({ createdAt: -1 }).limit(3);
    payments.forEach(p => console.log(`[${p.createdAt.toISOString()}] Amount: ₹${p.amount} - Status: ${p.status} - TXN: ${p.transactionId}`));

    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

checkBookings();
