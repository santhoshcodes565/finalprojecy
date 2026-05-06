const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  destination: { type: String, trim: true },
  duration: { type: String, required: true },
  states: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: '' },
  bannerImage: { type: String, default: '' },
  description: { type: String, default: '' },
  highlights: [{ type: String }],
  itinerary: [{
    day: Number,
    dateString: String,
    title: String,
    location: String,
    image: String,
    desc: String,
  }],
  seatsTotal: { type: Number, default: 50 },
  seatsBooked: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

// Virtual for available seats
tourSchema.virtual('seatsAvailable').get(function () {
  return this.seatsTotal - this.seatsBooked;
});

tourSchema.set('toJSON', { virtuals: true });
tourSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Tour', tourSchema);
