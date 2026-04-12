/**
 * Email Service — Nodemailer + Gmail SMTP for Sri Lakshmi Travels
 * Sends branded HTML emails for booking events, payments, reminders, etc.
 */
const nodemailer = require('nodemailer');

// Create transporter — falls back to dev mode if no credentials
let transporter;
try {
  if (process.env.EMAIL_USER && process.env.EMAIL_APP_PASSWORD) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });
  }
} catch (err) {
  console.warn('⚠️ Email transporter init failed:', err.message);
}

// ─── Branded HTML Email Template Generator ───────────────────
const getEmailHTML = (title, bodyHTML) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 12px; overflow: hidden; }
    .header { background: #1A3C5E; padding: 24px 32px; text-align: center; }
    .header h1 { color: #D4A017; margin: 0; font-size: 22px; }
    .header p { color: #E8F4F8; margin: 4px 0 0; font-size: 13px; }
    .body { padding: 32px; color: #374151; line-height: 1.7; }
    .booking-box { background: #E8F4F8; border-radius: 8px; padding: 16px 20px; margin: 16px 0; }
    .booking-box table { width: 100%; border-collapse: collapse; }
    .booking-box td { padding: 5px 0; font-size: 14px; }
    .booking-box td:first-child { color: #6B7280; width: 45%; }
    .booking-box td:last-child { font-weight: 600; color: #1A3C5E; }
    .status-badge { display: inline-block; padding: 4px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; }
    .confirmed { background: #D1FAE5; color: #065F46; }
    .pending { background: #FEF3C7; color: #92400E; }
    .cancelled { background: #FEE2E2; color: #991B1B; }
    .cta-button { display: block; width: fit-content; margin: 20px auto; background: #D4A017; color: #0F2233;
                  padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px; }
    .footer { background: #0F2233; padding: 20px 32px; text-align: center; color: #9CA3AF; font-size: 12px; }
    .footer a { color: #D4A017; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Sri Lakshmi Travels</h1>
      <p>Trusted since 1995 · Tamil Nadu, India</p>
    </div>
    <div class="body">
      <h2 style="color:#1A3C5E;margin-top:0">${title}</h2>
      ${bodyHTML}
    </div>
    <div class="footer">
      <p>Sri Lakshmi Travels · Tamil Nadu, India</p>
      <p>📞 ${process.env.COMPANY_PHONE || '+91 98765 43210'} · <a href="mailto:${process.env.EMAIL_USER || 'info@srilakshmitravels.com'}">${process.env.EMAIL_USER || 'info@srilakshmitravels.com'}</a></p>
      <p style="margin-top:8px;font-size:11px;color:#6B7280">This is an automated message. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

// ─── Email Templates ─────────────────────────────────────────
const EMAIL_TEMPLATES = {
  BOOKING_RECEIVED: (data) => ({
    subject: `Booking Received — ${data.bookingId} | Sri Lakshmi Travels`,
    html: getEmailHTML('Booking Received!', `
      <p>Dear <strong>${data.name}</strong>,</p>
      <p>Thank you for choosing Sri Lakshmi Travels! We have received your booking and our team will confirm it within 2 hours.</p>
      <div class="booking-box">
        <table>
          <tr><td>Booking ID</td><td>${data.bookingId}</td></tr>
          <tr><td>Service</td><td>${data.serviceName}</td></tr>
          <tr><td>Travel Date</td><td>${data.travelDate}</td></tr>
          <tr><td>Passengers</td><td>${data.passengers || 'N/A'}${data.children ? ` + ${data.children} Children` : ''}</td></tr>
          <tr><td>Total Amount</td><td>₹${(data.totalAmount || 0).toLocaleString('en-IN')}</td></tr>
          <tr><td>Amount Paid</td><td>₹${(data.paidAmount || 0).toLocaleString('en-IN')}</td></tr>
          <tr><td>Status</td><td><span class="status-badge pending">Pending Confirmation</span></td></tr>
        </table>
      </div>
      <p>We will send you another email and SMS once your booking is confirmed.</p>
      <p>For any queries, call us: <strong>${process.env.COMPANY_PHONE || '+91 98765 43210'}</strong></p>
    `),
  }),

  BOOKING_CONFIRMED: (data) => ({
    subject: `Booking CONFIRMED ✅ — ${data.bookingId} | Sri Lakshmi Travels`,
    html: getEmailHTML('Your Booking is Confirmed!', `
      <p>Dear <strong>${data.name}</strong>,</p>
      <p>Great news! Your booking has been <strong style="color:#065F46">confirmed</strong> by our team.</p>
      <div class="booking-box">
        <table>
          <tr><td>Booking ID</td><td><strong>${data.bookingId}</strong></td></tr>
          <tr><td>Service</td><td>${data.serviceName}</td></tr>
          <tr><td>Travel Date</td><td>${data.travelDate}</td></tr>
          <tr><td>Pickup Location</td><td>${data.pickupLocation || 'As discussed'}</td></tr>
          <tr><td>Passengers</td><td>${data.passengers || 'N/A'}</td></tr>
          <tr><td>Status</td><td><span class="status-badge confirmed">Confirmed</span></td></tr>
        </table>
      </div>
      <p>You will receive your driver details 24 hours before your trip via SMS and email.</p>
      <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/my-bookings" class="cta-button">View My Booking</a>
    `),
  }),

  DRIVER_ASSIGNED: (data) => ({
    subject: `Driver Assigned for your Trip — ${data.bookingId} | Sri Lakshmi Travels`,
    html: getEmailHTML('Your Driver Details', `
      <p>Dear <strong>${data.name}</strong>,</p>
      <p>Your driver has been assigned for your upcoming trip. Here are the details:</p>
      <div class="booking-box">
        <table>
          <tr><td>Booking ID</td><td>${data.bookingId}</td></tr>
          <tr><td>Travel Date</td><td>${data.travelDate}</td></tr>
          <tr><td>Driver Name</td><td><strong>${data.driverName}</strong></td></tr>
          <tr><td>Driver Phone</td><td><strong>${data.driverPhone}</strong></td></tr>
          <tr><td>Vehicle</td><td>${data.vehicle || 'Will be shared soon'}</td></tr>
          <tr><td>Vehicle Number</td><td>${data.vehicleNumber || 'Will be shared soon'}</td></tr>
        </table>
      </div>
      <p>Please be ready at your pickup location at least 10 minutes early.</p>
      <p>You can directly contact your driver: <strong>${data.driverPhone}</strong></p>
    `),
  }),

  TRIP_REMINDER: (data) => ({
    subject: `Trip Reminder — Tomorrow is your ${data.destination || data.serviceName} trip! | Sri Lakshmi Travels`,
    html: getEmailHTML('Your Trip is Tomorrow!', `
      <p>Dear <strong>${data.name}</strong>,</p>
      <p>This is a friendly reminder that your trip is <strong>tomorrow, ${data.travelDate}</strong>.</p>
      <div class="booking-box">
        <table>
          <tr><td>Destination</td><td>${data.destination || data.serviceName}</td></tr>
          <tr><td>Travel Date</td><td>${data.travelDate}</td></tr>
          <tr><td>Driver</td><td>${data.driverName || 'To be assigned'} — ${data.driverPhone || 'N/A'}</td></tr>
          <tr><td>Vehicle</td><td>${data.vehicle || 'N/A'}</td></tr>
          <tr><td>Pickup</td><td>${data.pickupLocation || 'As discussed'}</td></tr>
        </table>
      </div>
      <p>Have a wonderful journey! 🙏</p>
    `),
  }),

  BOOKING_CANCELLED: (data) => ({
    subject: `Booking Cancelled — ${data.bookingId} | Sri Lakshmi Travels`,
    html: getEmailHTML('Booking Cancelled', `
      <p>Dear <strong>${data.name}</strong>,</p>
      <p>Your booking <strong>${data.bookingId}</strong> has been cancelled.</p>
      <div class="booking-box">
        <table>
          <tr><td>Booking ID</td><td>${data.bookingId}</td></tr>
          <tr><td>Service</td><td>${data.serviceName}</td></tr>
          <tr><td>Reason</td><td>${data.reason || 'Cancelled by request'}</td></tr>
          <tr><td>Refund Amount</td><td>₹${(data.refundAmount || 0).toLocaleString('en-IN')}</td></tr>
          <tr><td>Refund Timeline</td><td>5–7 business days</td></tr>
          <tr><td>Status</td><td><span class="status-badge cancelled">Cancelled</span></td></tr>
        </table>
      </div>
      <p>For any queries, please call: <strong>${process.env.COMPANY_PHONE || '+91 98765 43210'}</strong></p>
    `),
  }),

  PAYMENT_SUCCESS: (data) => ({
    subject: `Payment Successful — ₹${data.amount} | Sri Lakshmi Travels`,
    html: getEmailHTML('Payment Successful', `
      <p>Dear <strong>${data.name}</strong>,</p>
      <p>We have received your payment. Here is your payment receipt:</p>
      <div class="booking-box">
        <table>
          <tr><td>Booking ID</td><td>${data.bookingId}</td></tr>
          <tr><td>Payment ID</td><td>${data.razorpayPaymentId || 'N/A'}</td></tr>
          <tr><td>Amount Paid</td><td><strong>₹${(data.amount || 0).toLocaleString('en-IN')}</strong></td></tr>
          <tr><td>Payment Method</td><td>${data.method || 'Online'}</td></tr>
          <tr><td>Payment Type</td><td>${data.paymentType === 'advance' ? 'Advance Payment' : 'Full Payment'}</td></tr>
          <tr><td>Date</td><td>${new Date().toLocaleDateString('en-IN')}</td></tr>
        </table>
      </div>
      ${data.paymentType === 'advance' ? `<p>Balance amount of <strong>₹${(data.balanceAmount || 0).toLocaleString('en-IN')}</strong> is due before your travel date.</p>` : ''}
    `),
  }),

  REVIEW_REQUEST: (data) => ({
    subject: `How was your trip to ${data.destination || data.serviceName}? Share your review!`,
    html: getEmailHTML('We hope you had a great trip!', `
      <p>Dear <strong>${data.name}</strong>,</p>
      <p>Your trip to <strong>${data.destination || data.serviceName}</strong> on ${data.travelDate} is now complete!</p>
      <p>We would love to hear your feedback. Your review helps other travelers and helps us improve.</p>
      <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/my-reviews?bookingId=${data.bookingId}" class="cta-button">Write a Review ⭐</a>
      <p style="font-size:13px;color:#6B7280;margin-top:16px">Thank you for choosing Sri Lakshmi Travels. We look forward to serving you again!</p>
    `),
  }),

  OTP: (data) => ({
    subject: `Your OTP — Sri Lakshmi Travels`,
    html: getEmailHTML('OTP Verification', `
      <p>Dear <strong>${data.name}</strong>,</p>
      <p>Your One-Time Password (OTP) for Sri Lakshmi Travels is:</p>
      <div style="text-align:center; margin: 24px 0;">
        <span style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #1A3C5E; background: #E8F4F8; padding: 16px 32px; border-radius: 12px;">${data.otp}</span>
      </div>
      <p>This OTP is valid for <strong>10 minutes</strong>. Do not share this with anyone.</p>
      <p style="font-size:12px;color:#9CA3AF;margin-top:16px">If you didn't request this, please ignore this email.</p>
    `),
  }),

  PASSWORD_RESET: (data) => ({
    subject: `Password Reset — Sri Lakshmi Travels`,
    html: getEmailHTML('Reset Your Password', `
      <p>Dear <strong>${data.name}</strong>,</p>
      <p>We received a request to reset your password. Click the button below to set a new password:</p>
      <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${data.resetToken}" class="cta-button">Reset Password</a>
      <p>This link expires in <strong>1 hour</strong>.</p>
      <p style="font-size:12px;color:#9CA3AF;margin-top:16px">If you didn't request a password reset, please ignore this email.</p>
    `),
  }),
};

/**
 * Send branded email
 * @param {string} toEmail - Recipient email
 * @param {string} templateKey - One of EMAIL_TEMPLATES keys
 * @param {object} data - Template data
 */
const sendEmail = async (toEmail, templateKey, data) => {
  try {
    const template = EMAIL_TEMPLATES[templateKey];
    if (!template) {
      console.warn(`⚠️ Unknown email template: ${templateKey}`);
      return { success: false, error: 'Unknown template' };
    }

    const { subject, html } = template(data);

    // Dev mode — no transporter configured
    if (!transporter) {
      console.log(`📧 [EMAIL-DEV] Would send "${subject}" to ${toEmail}`);
      return { success: true, dev: true };
    }

    await transporter.sendMail({
      from: `"Sri Lakshmi Travels" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject,
      html,
    });

    console.log(`✅ Email sent to ${toEmail} — ${templateKey}`);
    return { success: true };
  } catch (error) {
    console.error(`❌ Email send failed (${templateKey} → ${toEmail}):`, error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { sendEmail, EMAIL_TEMPLATES };
