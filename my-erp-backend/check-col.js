const {Pool} = require('pg');
const p = new Pool({user:'postgres',host:'localhost',database:'goldenfield_erp',password:'Zillion',port:5432});
p.query("SELECT character_maximum_length FROM information_schema.columns WHERE table_name='employee_schedule' AND column_name='half_month'").then(r => {
    console.log(JSON.stringify(r.rows));
    p.end();
}).catch(e => {
    console.error(e.message);
    p.end();
});