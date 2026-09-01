const dotenv = require('dotenv');
// Load environment variables
dotenv.config();

const connectDB = require('./src/config/db');
const app = require('./src/app');

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log('====================================================');
  console.log(`🚀 Samadhan Connect API Server running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🌐 CORS enabled for: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
  console.log(`📁 Uploads available at: http://localhost:${PORT}/uploads`);
  console.log('====================================================');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`[Server Error] Unhandled Rejection: ${err.message}`);
  // In production, might close server: server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(`[Server Error] Uncaught Exception: ${err.message}`);
});
