const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const register = async (nombre, email, password) => {
  const hash = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO usuarios (rol_id, nombre, email, password_hash)
     VALUES (1, $1, $2, $3)`,
    [nombre, email, hash]
  );

  return { message: 'Veterinario registrado correctamente' };
};

const login = async (email, password) => {
  const result = await pool.query(
    'SELECT * FROM usuarios WHERE email = $1',
    [email]
  );

  if (result.rowCount === 0) return null;

  const user = result.rows[0];
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return null;

  const token = jwt.sign(
    { id: user.id, rol_id: user.rol_id },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  return {
    token,
    user: {
      id: user.id,
      nombre: user.nombre,
      rol_id: user.rol_id
    }
  };
};

module.exports = { register, login };
