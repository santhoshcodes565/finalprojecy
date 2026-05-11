const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceId: { type: String, required: true },
  serviceType: { type: String, enum: ['tour', 'car', 'driver'], required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, default: '' },
  userName: { type: String, default: '' },
  isApproved: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
