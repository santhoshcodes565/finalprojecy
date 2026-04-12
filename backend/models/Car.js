const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true },
  seats: { type: Number, required: true },
  fuel: { type: String, required: true },
  transmission: { type: String, required: true },
  pricePerKm: { type: Number, required: true },
  minKmPerDay: { type: Number, default: 250 },
  driverBata: { type: Number, default: 400 },
  image: { type: String, default: '' },
  features: [{ type: String }],
  desc: { type: String, default: '' },
  isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
