const mongoose = require('mongoose');
const dns = require('dns');

// Fix for networks that block DNS SRV lookups (common on restricted WiFi/corporate networks)
dns.setDefaultResultOrder('ipv4first');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
    });
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log('\n💡 Troubleshooting Tips:');
    console.log('   1. Check your internet connection');
    console.log('   2. Make sure your IP is whitelisted in MongoDB Atlas (Network Access → Add "0.0.0.0/0")');
    console.log('   3. Verify your username and password in the .env file');
    process.exit(1);
  }
};

module.exports = connectDB;
