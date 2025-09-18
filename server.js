const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://127.0.0.1:3000', 
    'http://localhost:5173', 
    'http://127.0.0.1:5173',
    'https://makerr-harshit057.vercel.app', // Replace with your actual Vercel domain
    'https://makerr-kappa.vercel.app', // Alternative domain pattern
    /\.vercel\.app$/, // Allow all Vercel preview deployments
    /^https:\/\/makerr.*\.vercel\.app$/ // Allow any makerr-* subdomain on vercel
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://harshitsharmasncp1212:Dilhitohai24%23@cluster0.dxpctoc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
console.log('Connecting to MongoDB:', MONGODB_URI);

// Try to connect to MongoDB, but don't crash if it fails
mongoose.connect(MONGODB_URI).catch(err => {
  console.log('MongoDB connection failed, continuing without database:', err.message);
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB successfully');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Routes
console.log('🔧 Setting up API routes...');
app.use('/api/contact', require('./routes/contact'));
app.use('/api/services', require('./routes/services'));

// Serve static files from the React client build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api/`);
});
