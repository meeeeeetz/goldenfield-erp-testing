const {Pool} = require('pg');
const p = new Pool({user:'postgres',host:'localhost',database:'goldenfield_erp',password:'Zillion',port:5432});
p.query("ALTER TABLE employee_schedule ALTER COLUMN half_month TYPE VARCHAR(50)").then(r => {
    console.log('Column altered successfully');
    p.end();
}).catch(e => {
    console.error(e.message);
    p.end();
});