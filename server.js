const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// connect to DB
connectDB();

// middleware
app.use(express.json());

// routes
app.use('/api/contacts', require('./routes/contactsRoutes'));

// health route
app.get('/', (req, res) => {
  res.json({ message: 'Contact Manager API is running' });
});

// error handler (should be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  // optionally exit process: process.exit(1);
});
