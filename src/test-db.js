require('dotenv').config();
const pool = require('./config/db');

const test = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Conectado a Supabase:', res.rows[0]);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

test();
