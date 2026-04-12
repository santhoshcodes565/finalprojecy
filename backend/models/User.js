const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
  },
  phone: { type: String, required: [true, 'Phone is required'], trim: true },
  password: { type: String, required: [true, 'Password is required'], minlength: 6, select: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isVerified: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  avatar: { type: String, default: '' },
  profilePhoto: { type: String, default: '' },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  dob: { type: Date },
  city: { type: String },
  preferredCarType: { type: String, enum: ['Hatchback', 'Sedan', 'SUV', 'Luxury'] },
  emergencyContact: {
    name: String,
    phone: String,
    relation: String
  },
  communicationPreferences: {
    whatsapp: { type: Boolean, default: true },
    emailPromotions: { type: Boolean, default: false }
  },
  savedTours: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tour' }],
  refreshToken: { type: String },
  otp: { type: String },
  otpExpiry: { type: Date },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
