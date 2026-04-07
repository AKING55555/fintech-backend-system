const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('./routes/authRoutes');
const recordRoutes = require('./routes/recordRoutes');
const userRoutes = require('./routes/userRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// ===== GLOBAL MIDDLEWARE =====
app.use(cors({
  origin: "*",
  credentials: false,
}));
app.use(helmet());
app.use(express.json());

// ===== HEALTH CHECK =====
app.get('/', (req, res) => {
  res.send('API RUNNING');
});

// ===== ROUTES =====
app.use('/api/auth', authRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dashboard',dashboardRoutes);


// ===== 404 HANDLER =====
app.use((req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.originalUrl}`
  });
});

// ===== GLOBAL ERROR HANDLER =====
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
});

module.exports = app;