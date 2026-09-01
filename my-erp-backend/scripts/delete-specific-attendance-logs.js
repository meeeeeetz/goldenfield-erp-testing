const pool = require('../config/database');

async function deleteSpecificAttendanceLogs() {
    const idsToDelete = [
        'AttLog-000000001',
        'AttLog-000000002',
        'AttLog-000000003',
        'AttLog-000000004',
        'AttLog-000000005',
        'AttLog-000000006',
        'AttLog-000000007',
        'AttLog-000000008',
        'AttLog-000000009',
        'AttLog-000000010',
        'AttLog-000000011',
        'AttLog-000000012',
        'AttLog-000000013',
        'AttLog-000000014',
        'AttLog-000000015',
        'AttLog-000000016',
        'AttLog-000000038'
    ];

    try {
        // First check which ones exist
        const checkQuery = `
            SELECT attendance_id, employee_id, date, time_in, time_out
            FROM attendance_log
            WHERE attendance_id = ANY($1::text[])
        `;
        const checkResult = await pool.query(checkQuery, [idsToDelete]);
        
        console.log(`Found ${checkResult.rows.length} records to delete:`);
        checkResult.rows.forEach(row => {
            console.log(`  ${row.attendance_id} - ${row.employee_id} - ${row.date}`);
        });

        if (checkResult.rows.length === 0) {
            console.log('No matching records found. Nothing to delete.');
            return;
        }

        // Delete the records
        const deleteQuery = `
            DELETE FROM attendance_log
            WHERE attendance_id = ANY($1::text[])
            RETURNING attendance_id
        `;
        const deleteResult = await pool.query(deleteQuery, [idsToDelete]);
        
        console.log(`\nSuccessfully deleted ${deleteResult.rows.length} records:`);
        deleteResult.rows.forEach(row => {
            console.log(`  ${row.attendance_id}`);
        });

        // Reset sequence if needed
        const seqQuery = `SELECT setval('attendance_log_seq', (SELECT MAX(CAST(SUBSTRING(attendance_id FROM 8) AS INTEGER)) FROM attendance_log), true)`;
        await pool.query(seqQuery);
        console.log('\nSequence reset to max existing ID.');

    } catch (error) {
        console.error('Deletion error:', error.message);
        throw error;
    } finally {
        await pool.end();
    }
}

deleteSpecificAttendanceLogs();
