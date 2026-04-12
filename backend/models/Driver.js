const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, default: '' },
  experience: { type: Number, required: true },
  languages: [{ type: String }],
  rating: { type: Number, default: 0, min: 0, max: 5 },
  trips: { type: Number, default: 0 },
  image: { type: String, default: '' },
  bio: { type: String, default: '' },
  licenseNo: { type: String, default: '' },
  isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Driver', driverSchema);
