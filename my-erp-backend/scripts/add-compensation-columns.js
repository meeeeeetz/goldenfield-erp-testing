const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'Zillion',
  database: 'goldenfield_erp'
});

async function migrate() {
  const sql = `
    ALTER TABLE employee_compensation
      ADD COLUMN IF NOT EXISTS sss_contribution_mode VARCHAR(50),
      ADD COLUMN IF NOT EXISTS sss_contribution_amount NUMERIC,
      ADD COLUMN IF NOT EXISTS sss_loan_payment_mode VARCHAR(50),
      ADD COLUMN IF NOT EXISTS sss_loan_amount NUMERIC,
      ADD COLUMN IF NOT EXISTS philhealth_contribution_mode VARCHAR(50),
      ADD COLUMN IF NOT EXISTS philhealth_contribution_amount NUMERIC,
      ADD COLUMN IF NOT EXISTS pagibig_contribution_mode VARCHAR(50),
      ADD COLUMN IF NOT EXISTS pagibig_contribution_amount NUMERIC,
      ADD COLUMN IF NOT EXISTS pagibig_loan_payment_mode VARCHAR(50),
      ADD COLUMN IF NOT EXISTS pagibig_loan_amount NUMERIC
  `;

  await pool.query(sql);
  console.log('Columns added');

  const updateSql = `
    UPDATE employee_compensation
    SET sss_contribution_mode = 'Semi monthly',
        sss_contribution_amount = 0,
        sss_loan_payment_mode = 'Semi monthly',
        sss_loan_amount = 0,
        philhealth_contribution_mode = 'Semi monthly',
        philhealth_contribution_amount = 0,
        pagibig_contribution_mode = 'Semi monthly',
        pagibig_contribution_amount = 0,
        pagibig_loan_payment_mode = 'Semi monthly',
        pagibig_loan_amount = 0
  `;

  const result = await pool.query(updateSql);
  console.log('Updated rows:', result.rowCount);

  await pool.end();
}

migrate().catch(err => {
  console.error(err);
  process.exit(1);
});
