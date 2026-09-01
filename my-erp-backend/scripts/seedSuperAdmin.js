require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool = require('../config/database');

async function seedSuperAdmin() {
    const email = process.env.SUPERADMIN_EMAIL;
    const rawPassword = process.env.SUPERADMIN_PASSWORD;

    if (!email || !rawPassword) {
        console.error('ERROR: SUPERADMIN_EMAIL and SUPERADMIN_PASSWORD must be set in .env');
        process.exit(1);
    }

    try {
        const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
        if (existing.rows.length > 0) {
            console.log('Super Admin already exists.');
            return;
        }

        const passwordHash = await bcrypt.hash(rawPassword, 12);
        const result = await pool.query(
            'INSERT INTO users (email, password_hash, first_name, last_name, role, status, must_change_password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, email, role',
            [email, passwordHash, 'Super', 'Admin', 'SUPER_ADMIN', 'ACTIVE', true]
        );

        console.log('Super Admin account created successfully:', result.rows[0]);
    } catch (err) {
        console.error('Failed to seed Super Admin:', err);
        process.exit(1);
    }
}

seedSuperAdmin();
