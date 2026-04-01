require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/config/db');
const seedAdmin = require('./src/config/seedAdmin');

const PORT = process.env.PORT || 5000;

// 🔥 Proper startup sequence
const startServer = async () => {
  try {
    // 1. Connect DB FIRST
    await connectDB();
    console.log('MongoDB connected');

    // 2. Seed admin
    await seedAdmin();

    // 3. Start server
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error('❌ Server failed to start:', err.message);
    process.exit(1);
  }
};

startServer();