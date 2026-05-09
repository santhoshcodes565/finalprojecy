const mongoose = require('mongoose');

const carBookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  carId: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  altPhone: { type: String },
  tripType: { type: String, enum: ['one-way', 'round-trip', 'multi-city'], required: true },
  pickupLocation: { type: String, required: true },
  dropLocation: { type: String, required: true },
  pickupDate: { type: Date, required: true },
  pickupTime: { type: String, required: true },
  returnDate: { type: Date },
  carCategory: { type: String, required: true },
  adults: { type: Number, min: 1, required: true },
  children: { type: Number, default: 0 },
  luggage: { type: Number, default: 0 },
  idType: { type: String },
  idNumber: { type: String },
  specialRequests: { type: String },
  assignedDriver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
  paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
  paymentScreenshot: { type: String },
  drivingLicense: { type: String },
  idProof: { type: String },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
  totalAmount: { type: Number },
  advancePaid: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('CarBooking', carBookingSchema);
