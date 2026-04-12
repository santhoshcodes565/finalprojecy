const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, required: true },
  bookingType: { type: String, enum: ['car', 'driver', 'package'], required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['upi', 'card', 'netbanking', 'cash', 'wallet'], default: 'upi' },
  status: { type: String, enum: ['pending', 'partial', 'full', 'refunded', 'failed'], default: 'pending' },
  transactionId: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
