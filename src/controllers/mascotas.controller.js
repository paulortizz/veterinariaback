const pool = require('../config/db');

exports.misMascotas = async (req, res) => {
  try {
    const veterinarioId = req.user.id;

    const result = await pool.query(
      `
      SELECT m.id, m.nombre, m.especie, m.raza, m.edad
      FROM mascotas m
      WHERE m.veterinario_id = $1
      ORDER BY m.nombre
      `,
      [veterinarioId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener mascotas', error);
    res.status(500).json({ message: 'Error al obtener mascotas' });
  }
};