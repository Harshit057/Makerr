const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

async function createFirstAdmin() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/makerr';
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if any admin exists
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Username:', existingAdmin.username);
      console.log('Email:', existingAdmin.email);
      process.exit(0);
    }

    // Create first super admin
    const admin = new Admin({
      username: 'admin',
      email: 'info.makerr@gmail.com',
      password: 'admin123',
      role: 'super-admin'
    });

    await admin.save();
    
    console.log('✅ First admin user created successfully!');
    console.log('📧 Email: info.makerr@gmail.com');
    console.log('👤 Username: admin');
    console.log('🔐 Password: admin123');
    console.log('🔗 Login at: http://localhost:3000/admin/login');
    console.log('\n⚠️  Please change the password after first login!');
    
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

createFirstAdmin();
