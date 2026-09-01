const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');
const { body, validationResult } = require('express-validator');

const SALT_ROUNDS = 12;

const registerValidation = [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    body('firstName').optional().trim().isLength({ max: 100 }),
    body('lastName').optional().trim().isLength({ max: 100 }),
    body('role').optional().isIn(['SUPER_ADMIN', 'ADMIN', 'USER']),
    body('status').optional().isIn(['ACTIVE', 'INACTIVE', 'SUSPENDED'])
];

const loginValidation = [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
];

const changePasswordValidation = [
    body('currentPassword').notEmpty(),
    body('newPassword').isLength({ min: 8 })
];

const updateProfileValidation = [
    body('firstName').optional().trim().isLength({ max: 100 }),
    body('lastName').optional().trim().isLength({ max: 100 }),
    body('email').optional().isEmail().normalizeEmail()
];

const updateUserValidation = [
    body('email').optional().isEmail().normalizeEmail(),
    body('firstName').optional().trim().isLength({ max: 100 }),
    body('lastName').optional().trim().isLength({ max: 100 }),
    body('role').optional().isIn(['SUPER_ADMIN', 'ADMIN', 'USER']),
    body('status').optional().isIn(['ACTIVE', 'INACTIVE', 'SUSPENDED']),
    body('mustChangePassword').optional().isBoolean()
];

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

const sanitizeUser = (user) => {
    const { password_hash, ...rest } = user;
    return rest;
};

const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, firstName, lastName, role = 'USER', status = 'ACTIVE', mustChangePassword = false } = req.body;

        const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(409).json({ error: 'Email already registered' });
        }

        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

        const result = await pool.query(
            'INSERT INTO users (email, password_hash, first_name, last_name, role, status, must_change_password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, email, first_name, last_name, role, status, must_change_password, created_at',
            [email, passwordHash, firstName, lastName, role, status, mustChangePassword]
        );

        const user = result.rows[0];
        const token = generateToken(user);

        res.status(201).json({
            message: 'User created successfully',
            user: sanitizeUser(user),
            token
        });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ error: 'Failed to register user' });
    }
};

const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        if (user.status !== 'ACTIVE') {
            return res.status(403).json({ error: 'Account is inactive or suspended' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        await pool.query('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1', [user.id]);

        const token = generateToken(user);

        res.json({
            user: sanitizeUser(user),
            token,
            mustChangePassword: user.must_change_password
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Failed to login' });
    }
};

const getMe = async (req, res) => {
    try {
        const result = await pool.query('SELECT id, email, first_name, last_name, role, status, must_change_password, last_login, created_at FROM users WHERE id = $1', [req.user.id]);
        const user = result.rows[0];
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ user: sanitizeUser(user) });
    } catch (err) {
        console.error('GetMe error:', err);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
};

const updateProfile = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { firstName, lastName, email } = req.body;
        const updates = [];
        const values = [];
        let counter = 1;

        if (firstName !== undefined) { updates.push(`first_name = $${counter++}`); values.push(firstName); }
        if (lastName !== undefined) { updates.push(`last_name = $${counter++}`); values.push(lastName); }
        if (email !== undefined) { updates.push(`email = $${counter++}`); values.push(email); }

        updates.push(`updated_at = CURRENT_TIMESTAMP`);
        values.push(req.user.id);

        const result = await pool.query(
            `UPDATE users SET ${updates.join(', ')} WHERE id = $${counter} RETURNING id, email, first_name, last_name, role, status, must_change_password`,
            values
        );

        res.json({ user: sanitizeUser(result.rows[0]) });
    } catch (err) {
        console.error('UpdateProfile error:', err);
        res.status(500).json({ error: 'Failed to update profile' });
    }
};

const changePassword = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { currentPassword, newPassword } = req.body;

        const result = await pool.query('SELECT password_hash FROM users WHERE id = $1', [req.user.id]);
        const user = result.rows[0];

        const isValid = await bcrypt.compare(currentPassword, user.password_hash);
        if (!isValid) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }

        const newHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
        await pool.query('UPDATE users SET password_hash = $1, must_change_password = FALSE WHERE id = $2', [newHash, req.user.id]);

        res.json({ message: 'Password changed successfully' });
    } catch (err) {
        console.error('ChangePassword error:', err);
        res.status(500).json({ error: 'Failed to change password' });
    }
};

const getUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const roleFilter = req.query.role || '';
        const statusFilter = req.query.status || '';

        const offset = (page - 1) * limit;
        const conditions = [];
        const values = [];
        let counter = 1;

        if (search) {
            conditions.push(`(first_name ILIKE $${counter} OR last_name ILIKE $${counter} OR email ILIKE $${counter})`);
            values.push(`%${search}%`);
            counter++;
        }
        if (roleFilter) {
            conditions.push(`role = $${counter++}`);
            values.push(roleFilter);
        }
        if (statusFilter) {
            conditions.push(`status = $${counter++}`);
            values.push(statusFilter);
        }

        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

        const countResult = await pool.query(`SELECT COUNT(*) FROM users ${whereClause}`, values);
        const total = parseInt(countResult.rows[0].count);

        const dataResult = await pool.query(
            `SELECT id, email, first_name, last_name, role, status, must_change_password, last_login, created_at FROM users ${whereClause} ORDER BY created_at DESC LIMIT $${counter++} OFFSET $${counter}`,
            [...values, limit, offset]
        );

        res.json({
            users: dataResult.rows.map(sanitizeUser),
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        console.error('GetUsers error:', err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

const updateUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userId = parseInt(req.params.id);
        const { email, firstName, lastName, role, status, mustChangePassword } = req.body;

        const updates = [];
        const values = [];
        let counter = 1;

        if (email !== undefined) { updates.push(`email = $${counter++}`); values.push(email); }
        if (firstName !== undefined) { updates.push(`first_name = $${counter++}`); values.push(firstName); }
        if (lastName !== undefined) { updates.push(`last_name = $${counter++}`); values.push(lastName); }
        if (role !== undefined) { updates.push(`role = $${counter++}`); values.push(role); }
        if (status !== undefined) { updates.push(`status = $${counter++}`); values.push(status); }
        if (mustChangePassword !== undefined) { updates.push(`must_change_password = $${counter++}`); values.push(mustChangePassword); }

        updates.push(`updated_at = CURRENT_TIMESTAMP`);
        values.push(userId);

        const result = await pool.query(
            `UPDATE users SET ${updates.join(', ')} WHERE id = $${counter} RETURNING id, email, first_name, last_name, role, status, must_change_password, last_login, created_at`,
            values
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user: sanitizeUser(result.rows[0]) });
    } catch (err) {
        console.error('UpdateUser error:', err);
        res.status(500).json({ error: 'Failed to update user' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);

        if (req.user.id === userId) {
            return res.status(400).json({ error: 'Cannot delete your own account' });
        }

        const result = await pool.query(
            'UPDATE users SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id',
            ['INACTIVE', userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User deactivated successfully' });
    } catch (err) {
        console.error('DeleteUser error:', err);
        res.status(500).json({ error: 'Failed to deactivate user' });
    }
};

const seedSuperAdmin = async (req, res) => {
    try {
        const email = process.env.SUPERADMIN_EMAIL;
        const rawPassword = process.env.SUPERADMIN_PASSWORD;

        if (!email || !rawPassword) {
            return res.status(500).json({ error: 'SUPERADMIN_EMAIL and SUPERADMIN_PASSWORD must be set in .env' });
        }

        const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
        if (existing.rows.length > 0) {
            return res.status(200).json({ message: 'Super Admin already exists' });
        }

        const passwordHash = await bcrypt.hash(rawPassword, SALT_ROUNDS);
        const result = await pool.query(
            'INSERT INTO users (email, password_hash, first_name, last_name, role, status, must_change_password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, email, first_name, last_name, role, status',
            [email, passwordHash, 'Super', 'Admin', 'SUPER_ADMIN', 'ACTIVE', true]
        );

        res.status(201).json({ message: 'Super Admin created successfully', user: sanitizeUser(result.rows[0]) });
    } catch (err) {
        console.error('Seed error:', err);
        res.status(500).json({ error: 'Failed to seed Super Admin' });
    }
};

module.exports = {
    registerValidation,
    loginValidation,
    changePasswordValidation,
    updateProfileValidation,
    updateUserValidation,
    register,
    login,
    getMe,
    updateProfile,
    changePassword,
    getUsers,
    updateUser,
    deleteUser,
    seedSuperAdmin
};
