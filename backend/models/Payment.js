const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, required: true },
  bookingType: { type: String, enum: ['car', 'driver', 'package'], required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['upi', 'card', 'netbanking', 'cash', 'wallet'], default: 'card' },
  status: { type: String, enum: ['INITIATED', 'PROCESSING', 'SUCCESS', 'FAILED'], default: 'INITIATED' },
  transactionId: { type: String, default: '' },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
