/**
 * Auth Routes — Sri Lakshmi Travels
 * Registration, Login, OTP verification, Password reset, Refresh token
 */
const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { sendSMS } = require('../services/smsService');
const { sendEmail } = require('../services/emailService');

const router = express.Router();

// ─── Helpers ─────────────────────────────────────────────

// Generate JWT access token
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Generate JWT refresh token
const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ─── Registration ────────────────────────────────────────

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, dob, city, whatsapp } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'An account with this email already exists.' });
    }

    // Generate OTP for verification
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create user
    const user = await User.create({ 
      name, email, phone, password, otp, otpExpiry,
      dob, city, communicationPreferences: { whatsapp: !!whatsapp, emailPromotions: false }
    });

    const token = generateToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token
    user.refreshToken = refreshToken;
    await user.save();

    // Send OTP via SMS and Email (non-blocking)
    sendSMS(phone, 'OTP', { otp, name }).catch(err =>
      console.error('OTP SMS failed:', err.message)
    );
    sendEmail(email, 'OTP', { otp, name }).catch(err =>
      console.error('OTP Email failed:', err.message)
    );

    res.status(201).json({
      message: 'Registration successful! Please verify your OTP.',
      token,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Registration failed.' });
  }
});

// ─── Login ───────────────────────────────────────────────

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    if (user.isBlocked) {
      return res.status(403).json({ message: 'Your account has been blocked. Contact support.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = generateToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      message: 'Login successful!',
      token,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed. Please try again.' });
  }
});

// ─── OTP Verification ────────────────────────────────────

// POST /api/auth/verify-otp
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (user.isVerified) {
      return res.json({ message: 'Account already verified.' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }

    if (user.otpExpiry && new Date() > user.otpExpiry) {
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ message: 'Account verified successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'OTP verification failed.' });
  }
});

// POST /api/auth/resend-otp
router.post('/resend-otp', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (user.isVerified) {
      return res.json({ message: 'Account already verified.' });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    // Send OTP
    sendSMS(user.phone, 'OTP', { otp, name: user.name }).catch(err =>
      console.error('Resend OTP SMS failed:', err.message)
    );
    sendEmail(email, 'OTP', { otp, name: user.name }).catch(err =>
      console.error('Resend OTP Email failed:', err.message)
    );

    res.json({ message: 'OTP sent successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to resend OTP.' });
  }
});

// ─── Password Reset ──────────────────────────────────────

// POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if user exists or not
      return res.json({ message: 'If a matching account is found, a reset link will be sent.' });
    }

    // Generate reset token (use OTP field for simplicity)
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.otp = resetToken;
    user.otpExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    // Send reset email
    sendEmail(email, 'PASSWORD_RESET', {
      name: user.name,
      resetToken,
    }).catch(err => console.error('Password reset email failed:', err.message));

    res.json({ message: 'If a matching account is found, a reset link will be sent.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to process request.' });
  }
});

// POST /api/auth/reset-password
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: 'Token and new password are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    const user = await User.findOne({
      otp: token,
      otpExpiry: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token.' });
    }

    user.password = password;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ message: 'Password reset successfully! Please login with your new password.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reset password.' });
  }
});

// ─── Token Refresh ───────────────────────────────────────

// POST /api/auth/refresh-token
router.post('/refresh-token', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token required.' });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: 'Invalid refresh token.' });
    }

    const newToken = generateToken(user._id, user.role);
    const newRefreshToken = generateRefreshToken(user._id);

    user.refreshToken = newRefreshToken;
    await user.save();

    res.json({ token: newToken, refreshToken: newRefreshToken });
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired refresh token.' });
  }
});

// ─── Logout ──────────────────────────────────────────────

// POST /api/auth/logout
router.post('/logout', auth, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.userId, { refreshToken: null });
    res.json({ message: 'Logged out successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed.' });
  }
});

// ─── Profile ─────────────────────────────────────────────

// GET /api/auth/me — Get current user profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        profilePhoto: user.profilePhoto,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
        dob: user.dob,
        gender: user.gender,
        city: user.city,
        preferredCarType: user.preferredCarType,
        communicationPreferences: user.communicationPreferences,
        emergencyContact: user.emergencyContact
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profile.' });
  }
});

// PUT /api/auth/profile — Update current user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { 
      name, phone, dob, gender, city, 
      preferredCarType, communicationPreferences, emergencyContact 
    } = req.body;
    
    // We omit email to prevent unauthorized changes via profile
    const user = await User.findByIdAndUpdate(
      req.userId,
      { 
        name, phone, dob, gender, city, 
        preferredCarType, communicationPreferences, emergencyContact 
      },
      { new: true, runValidators: true }
    );
    res.json({
      message: 'Profile updated!',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        profilePhoto: user.profilePhoto,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
        dob: user.dob,
        gender: user.gender,
        city: user.city,
        preferredCarType: user.preferredCarType,
        communicationPreferences: user.communicationPreferences,
        emergencyContact: user.emergencyContact
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to update profile.' });
  }
});

module.exports = router;
