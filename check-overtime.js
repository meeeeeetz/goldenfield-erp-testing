const pool = require('./my-erp-backend/config/database');

(async () => {
    try {
        const r = await pool.query("SELECT prosrc FROM pg_proc WHERE proname='generate_overtime_id'");
        console.log('Function source:');
        console.log(r.rows[0]?.prosrc || 'Function not found');
        
        const r2 = await pool.query('SELECT last_value, is_called FROM overtime_log_seq');
        console.log('\nSequence:', r2.rows[0]);
        
        const r3 = await pool.query("SELECT tgname, tgenabled FROM pg_trigger WHERE tgrelid = 'overtime_log'::regclass AND tgname='trigger_set_overtime_id'");
        console.log('\nTrigger enabled:', r3.rows[0]?.tgenabled);
        
        await pool.end();
    } catch (err) {
        console.error('Error:', err.message);
        await pool.end();
    }
})();