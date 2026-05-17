require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

// Initialize Express
const app = express();

// Connect to MongoDB Atlas
connectDB();

// ─── Security Middleware ─────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// ─── Request Logging ─────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// ─── Rate Limiting ───────────────────────────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit to 20 requests per window
  message: { message: 'Too many attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api/auth/forgot-password', authLimiter);
app.use('/api/auth/verify-otp', authLimiter);
app.use('/api/', generalLimiter);

// ─── Core Middleware ─────────────────────────────────────
// ─── CORS Allowed Origins ─────────────────────────────────
const ALLOWED_ORIGINS = [
  // Local development
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  // Production Vercel frontend (hardcoded as safety fallback)
  'https://frontend-sage-delta-0eqnt9gl39.vercel.app',
  // Dynamic from env (set this in Render dashboard)
  process.env.FRONTEND_URL,
  process.env.CLIENT_URL,
].filter(Boolean); // remove undefined values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, Postman, server-to-server)
    if (!origin) return callback(null, true);

    const isAllowed =
      ALLOWED_ORIGINS.includes(origin) ||
      origin.startsWith('http://localhost') ||
      // Allow any Vercel preview deploy for this project
      /https:\/\/frontend-[a-z0-9-]+\.vercel\.app$/.test(origin);

    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn('⚠️ CORS blocked:', origin);
      callback(new Error(`CORS: Origin ${origin} not allowed`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ─── Read Only Guard ─────────────────────────────────────
const readOnlyGuard = require('./middleware/readOnlyGuard');
app.use(readOnlyGuard);

// ─── API Routes ──────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tours', require('./routes/tours'));
app.use('/api/packages', require('./routes/tours')); // alias: /api/packages → tours
app.use('/api/cars', require('./routes/cars'));
app.use('/api/drivers', require('./routes/drivers'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/users', require('./routes/users'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/notifications', require('./routes/notifications'));

// ─── Root Route ──────────────────────────────────────────
app.get('/', (req, res) => {
  res.send('Backend is running successfully');
});

// ─── Health Check ────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Sri Lakshmi Travels API is running 🚀' });
});

// ─── Global Error Handler ────────────────────────────────
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// ─── Start Cron Jobs ─────────────────────────────────────
const startReminderJob = require('./jobs/reminderJob');
startReminderJob();

// ─── Start Server ────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 SLT Backend running on http://localhost:${PORT}`);
  console.log(`📧 Email service: ${process.env.EMAIL_USER ? '✅ Configured' : '⚠️ Dev mode (no credentials)'}`);
  console.log(`📱 SMS service: ${process.env.MSG91_AUTH_KEY ? '✅ Configured' : '⚠️ Dev mode (no credentials)'}`);
  console.log(`💳 Razorpay: ${process.env.RAZORPAY_KEY_ID ? '✅ Configured' : '⚠️ Dev mode (no credentials)'}`);
});
