const pool = require('../config/database');

async function deleteSpecificOvertimeLogs() {
    const idsToDelete = [
        'OTLog-000000001',
        'OTLog-000000002',
        'OTLog-000000003',
        'OTLog-000000004',
        'OTLog-000000005',
        'OTLog-000000006',
        'OTLog-000000007',
        'OTLog-000000008',
        'OTLog-000000009',
        'OTLog-000000010',
        'OTLog-000000011',
        'OTLog-000000012',
        'OTLog-000000013',
        'OTLog-000000014',
        'OTLog-000000015',
        'OTLog-000000016',
        'OTLog-000000017',
        'OTLog-000000018'
    ];

    try {
        const checkQuery = `
            SELECT overtime_id, employee_id, date, total_hours
            FROM overtime_log
            WHERE overtime_id = ANY($1::text[])
        `;
        const checkResult = await pool.query(checkQuery, [idsToDelete]);
        
        console.log(`Found ${checkResult.rows.length} records to delete:`);
        checkResult.rows.forEach(row => {
            console.log(`  ${row.overtime_id} - ${row.employee_id} - ${row.date} - ${row.total_hours}hrs`);
        });

        if (checkResult.rows.length === 0) {
            console.log('No matching records found. Nothing to delete.');
            return;
        }

        const deleteQuery = `
            DELETE FROM overtime_log
            WHERE overtime_id = ANY($1::text[])
            RETURNING overtime_id
        `;
        const deleteResult = await pool.query(deleteQuery, [idsToDelete]);
        
        console.log(`\nSuccessfully deleted ${deleteResult.rows.length} records:`);
        deleteResult.rows.forEach(row => {
            console.log(`  ${row.overtime_id}`);
        });

        const seqQuery = `SELECT setval('overtime_log_seq', (SELECT MAX(CAST(SUBSTRING(overtime_id FROM 7) AS INTEGER)) FROM overtime_log), true)`;
        await pool.query(seqQuery);
        console.log('\nSequence reset to max existing ID.');

    } catch (error) {
        console.error('Deletion error:', error.message);
        throw error;
    } finally {
        await pool.end();
    }
}

deleteSpecificOvertimeLogs();
