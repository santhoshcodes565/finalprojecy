/**
 * Quick test script — sends a real SMS to your number via Textbee
 */
const axios = require('axios');

const TEXTBEE_API_URL = 'https://api.textbee.dev/api/v1/gateway/devices';
const DEVICE_ID = '69de408fb5cd3ce4c79c2800';
const API_KEY = '5e49e840-b8ff-4059-882e-92ff3d7b0c48';

async function testSMS() {
  console.log('Sending test SMS to +919385930151 via Textbee...');

  try {
    const response = await axios.post(
      `${TEXTBEE_API_URL}/${DEVICE_ID}/send-sms`,
      {
        recipients: ['+919385930151'],
        message: 'Sri Lakshmi Travels: This is a test message. Your SMS system is working perfectly! - SLT'
      },
      {
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json'
        },
        timeout: 15000
      }
    );

    console.log('SUCCESS! Response:', JSON.stringify(response.data, null, 2));
  } catch (err) {
    console.log('FAILED!');
    console.log('Status:', err.response?.status);
    console.log('Error:', err.response?.data || err.message);
  }
}

testSMS();
