const mongoose = require('mongoose');

const driverBookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  requestedDriverId: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  driverType: { type: String, enum: ['local', 'tour-guide', 'outstation'], required: true },
  languages: [{ type: String }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  numberOfDays: { type: Number },
  workingHours: { type: String, enum: ['8', '10', '12'], required: true },
  startCity: { type: String, required: true },
  citiesToCover: { type: String },
  estimatedKm: { type: Number },
  hasOwnCar: { type: Boolean, default: false },
  needsRentalCar: { type: Boolean, default: false },
  nightDriving: { type: Boolean, default: false },
  hillRoute: { type: Boolean, default: false },
  specialInstructions: { type: String },
  idType: { type: String },
  idNumber: { type: String },
  assignedDriver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
  paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
  paymentScreenshot: { type: String },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
  totalAmount: { type: Number },
  advancePaid: { type: Number, default: 0 },
}, { timestamps: true });

// Auto-calculate numberOfDays
driverBookingSchema.pre('save', function (next) {
  if (this.startDate && this.endDate) {
    this.numberOfDays = Math.ceil((this.endDate - this.startDate) / (1000 * 60 * 60 * 24));
  }
  next();
});

module.exports = mongoose.model('DriverBooking', driverBookingSchema);
