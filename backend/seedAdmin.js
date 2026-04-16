const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('config');
const UserModel = require('./models/user');

const seedAdmin = async () => {
    try {
        await mongoose.connect(config.get('mongodb.connectionString'));
        console.log('Connected to MongoDB for seeding...');

        // Clear existing users to avoid duplicate key errors
        await UserModel.deleteMany({});
        console.log('Cleared existing users.');

        const hashedPassword = await bcrypt.hash('admin', 10);
        const adminUser = new UserModel({
            name: 'Admin',
            emailid: 'admin@gmail.com',
            password: hashedPassword,
            contact: '0000000000',
            type: 'ADMIN',
            status: true
        });

        await adminUser.save();
        console.log('Admin user seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding admin:', err);
        process.exit(1);
    }
};

seedAdmin();
