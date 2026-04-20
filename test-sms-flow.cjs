/**
 * SMS Test Script — End-to-End Flow
 * 1. Sign in as test user
 * 2. Create a car booking
 * 3. Promote user to admin
 * 4. Confirm the booking (triggers SMS via notificationService)
 */
const http = require('http');

const BASE = 'http://localhost:5000';

function request(method, path, body, token) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE);
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
        try {
          resolve({ status: res.statusCode, data: JSON.parse(chunks) });
        } catch {
          resolve({ status: res.statusCode, data: chunks });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function run() {
  console.log('=== SMS SYSTEM END-TO-END TEST ===\n');

  // Step 1: Sign in as the test user
  console.log('Step 1: Signing in as testsms@example.com...');
  const loginRes = await request('POST', '/api/auth/login', {
    email: 'testsms@example.com',
    password: 'Test@1234',
  });
  
  if (loginRes.status !== 200) {
    console.log('Login failed:', loginRes.data);
    console.log('\nTrying to register first...');
    const regRes = await request('POST', '/api/auth/register', {
      name: 'Test SMS User',
      email: 'testsms@example.com',
      phone: '6383624960',
      password: 'Test@1234',
      city: 'Chennai',
      gender: 'Male',
    });
    console.log('Register:', regRes.status, regRes.data.message || '');
    
    // Try login again
    const login2 = await request('POST', '/api/auth/login', {
      email: 'testsms@example.com',
      password: 'Test@1234',
    });
    if (login2.status !== 200) {
      console.log('Login still failed:', login2.data);
      return;
    }
    var token = login2.data.token;
    var userId = login2.data.user?._id || login2.data.user?.id;
    console.log('✅ Logged in! Token:', token?.slice(0, 30) + '...');
    console.log('   User ID:', userId);
  } else {
    var token = loginRes.data.token;
    var userId = loginRes.data.user?._id || loginRes.data.user?.id;
    console.log('✅ Logged in! Token:', token?.slice(0, 30) + '...');
    console.log('   User ID:', userId);
  }

  // Step 2: Create a car booking
  console.log('\nStep 2: Creating car booking...');
  const bookingRes = await request('POST', '/api/bookings/car', {
    carId: 'mahindra-xuv-3xo',
    carName: 'Mahindra XUV 3XO',
    fullName: 'Test SMS User',
    email: 'testsms@example.com',
    phone: '6383624960',
    tripType: 'one-way',
    pickupLocation: 'Chennai Airport',
    dropLocation: 'Coimbatore',
    pickupDate: '2026-04-15',
    pickupTime: '09:00 AM',
    carCategory: 'SUV',
    adults: 2,
    children: 0,
    luggage: 2,
    totalAmount: 4500,
    advancePaid: 500,
  }, token);

  if (bookingRes.status !== 201) {
    console.log('Booking failed:', bookingRes.data);
    return;
  }
  
  const booking = bookingRes.data.booking;
  const bookingId = booking._id;
  console.log('✅ Booking created!');
  console.log('   Booking ID:', bookingId);
  console.log('   Status:', booking.status);
  console.log('   → BOOKING_RECEIVED SMS should have been triggered (check server logs)');

  // Step 3: Promote user to admin via direct MongoDB update
  console.log('\nStep 3: Promoting user to admin...');
  // We'll use a temporary admin endpoint - let's update the user role directly
  // Since we can't use mongoose from here, let's use the users API
  // Actually, we need to add a temp script. Let me use a different approach.
  // We'll create a quick one-time script that runs on the server side.
  
  // For now, let's use node to connect to MongoDB directly
  console.log('   (Will be done via separate MongoDB script)');
  console.log('\n   Booking ID for admin confirmation:', bookingId);
  console.log('   Save this ID — needed for Step 4');
  
  // Write the booking ID to a file for the next step
  require('fs').writeFileSync(
    require('path').join(__dirname, 'test-booking-id.txt'),
    bookingId
  );
  console.log('   Saved to test-booking-id.txt');
}

run().catch(console.error);
