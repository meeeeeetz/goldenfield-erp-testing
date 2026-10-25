const express = require('express');
const router = express.Router();
const pool = require('../../config/database');
const { authenticateToken, requireModulePermission } = require('../../middleware/authMiddleware');

router.use(authenticateToken);
router.use(requireModulePermission('operations-layer-buildings'));

router.get('/', async (req, res) => {
    try {
        await pool.query(`CREATE TABLE IF NOT EXISTS layer_building_culling (
            id SERIAL PRIMARY KEY,
            building_name VARCHAR(255) UNIQUE NOT NULL,
            culling_age VARCHAR(20),
            culling_date VARCHAR(20),
            next_arrival_date VARCHAR(20),
            company VARCHAR(255),
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);
        const result = await pool.query('SELECT * FROM layer_building_culling');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        await pool.query(`CREATE TABLE IF NOT EXISTS layer_building_culling (
            id SERIAL PRIMARY KEY,
            building_name VARCHAR(255) UNIQUE NOT NULL,
            culling_age VARCHAR(20),
            culling_date VARCHAR(20),
            next_arrival_date VARCHAR(20),
            company VARCHAR(255),
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);
        const { building_name, culling_age, culling_date, next_arrival_date, company } = req.body;
        if (!building_name) return res.status(400).json({ error: 'building_name required' });
        const result = await pool.query(`
            INSERT INTO layer_building_culling (building_name, culling_age, culling_date, next_arrival_date, company, updated_at)
            VALUES ($1,$2,$3,$4,$5,CURRENT_TIMESTAMP)
            ON CONFLICT (building_name) DO UPDATE SET
                culling_age = EXCLUDED.culling_age,
                culling_date = EXCLUDED.culling_date,
                next_arrival_date = EXCLUDED.next_arrival_date,
                company = EXCLUDED.company,
                updated_at = CURRENT_TIMESTAMP
            RETURNING *
        `, [building_name, culling_age || null, culling_date || null, next_arrival_date || null, company || null]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;