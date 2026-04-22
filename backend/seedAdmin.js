const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('config');
const UserModel = require('./models/user');

const seedAdmin = async () => {
    try {
        await mongoose.connect(config.get('mongodb.connectionString'));

        const adminEmail = process.env.ADMIN_EMAIL || 'admin@gmail.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin';

        if (adminPassword === 'admin') {
            console.warn('WARNING: Using default admin password. Set ADMIN_PASSWORD env variable for production.');
        }

        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        const resetPassword = process.env.RESET_ADMIN_PASSWORD === 'true';

        const updateData = {
            $setOnInsert: {
                name: 'Admin',
                emailid: adminEmail,
                password: hashedPassword,
                contact: '0000000000',
                type: 'ADMIN',
                status: true
            }
        };

        if (resetPassword) {
            updateData.$set = { password: hashedPassword };
            console.log('RESET_ADMIN_PASSWORD is set to true. Admin password will be reset.');
        }

        await UserModel.findOneAndUpdate(
            { emailid: adminEmail },
            updateData,
            { upsert: true, new: true }
        );

        console.log('Admin user seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding admin:', err);
        process.exit(1);
    }
};

seedAdmin();
