/**
 * Step 3 & 4: Promote user to admin, then confirm the booking to trigger BOOKING_CONFIRMED SMS
 */
const mongoose = require('./backend/node_modules/mongoose');
const path = require('path');

// Load env
require('./backend/node_modules/dotenv').config({ path: path.join(__dirname, 'backend', '.env') });

const http = require('http');
const fs = require('fs');

const BASE = 'http://localhost:5000';
const BOOKING_ID = fs.readFileSync(path.join(__dirname, 'test-booking-id.txt'), 'utf8').trim();

function request(method, urlPath, body, token) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, BASE);
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };
    const req = http.request(options, (res) => {
      let chunks = '';
      res.on('data', (d) => (chunks += d));
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(chunks) }); }
        catch { resolve({ status: res.statusCode, data: chunks }); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function run() {
  console.log('=== ADMIN CONFIRM + SMS TRIGGER ===\n');
  console.log('Booking ID:', BOOKING_ID);

  // Step 3: Connect to MongoDB and promote user to admin
  console.log('\nStep 3: Promoting testsms@example.com to admin...');
  await mongoose.connect(process.env.MONGO_URI);
  const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }), 'users');
  
  const result = await User.updateOne(
    { email: 'testsms@example.com' },
    { $set: { role: 'admin' } }
  );
  console.log('✅ Updated:', result.modifiedCount, 'user(s) to admin role');
  await mongoose.disconnect();

  // Step 4: Sign in again (to get token with admin role)
  console.log('\nStep 4: Signing in as admin...');
  const loginRes = await request('POST', '/api/auth/login', {
    email: 'testsms@example.com',
    password: 'Test@1234',
  });
  
  if (loginRes.status !== 200) {
    console.log('❌ Login failed:', loginRes.data);
    return;
  }
  
  const token = loginRes.data.token;
  console.log('✅ Admin login successful!');
  console.log('   Role:', loginRes.data.user?.role);

  // Step 5: Confirm the booking (triggers BOOKING_CONFIRMED → SMS via MSG91)
  console.log('\nStep 5: Confirming booking to trigger BOOKING_CONFIRMED SMS...');
  console.log('   Endpoint: PATCH /api/bookings/car/' + BOOKING_ID + '/status');
  
  const confirmRes = await request('PATCH', `/api/bookings/car/${BOOKING_ID}/status`, {
    status: 'confirmed',
  }, token);

  console.log('   Response:', confirmRes.status, confirmRes.data.message || '');
  
  if (confirmRes.status === 200) {
    console.log('\n✅ BOOKING CONFIRMED! SMS notification triggered!');
    console.log('   → BOOKING_CONFIRMED SMS should be sent to 6383624960');
    console.log('   → Check server logs for MSG91 API response');
    console.log('\n📱 The SMS message would be:');
    console.log(`   "Dear Test User SMS, your booking (ID: ${BOOKING_ID.slice(-8).toUpperCase()}) for Travel Service is CONFIRMED! Amount: Rs.4500. For help call: +91 98765 43210. - Sri Lakshmi Travels"`);
  } else {
    console.log('❌ Confirmation failed:', confirmRes.data);
  }
}

run().catch(console.error);
