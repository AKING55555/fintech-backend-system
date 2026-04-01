const User = require('../models/User');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    await User.create({
      name: 'Super Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin'
    });

    console.log('Admin created successfully');
  } catch (err) {
    console.error('Error seeding admin:', err.message);
  }
};

module.exports = seedAdmin;