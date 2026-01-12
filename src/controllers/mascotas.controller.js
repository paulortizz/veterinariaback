const pool = require('../config/db');

exports.misMascotas = async (req, res) => {
  try {
    const veterinarioId = req.user.id;
    console.log('Usuario que pide mascotas:', veterinarioId);

    const result = await pool.query(
      `
      SELECT m.id, m.nombre, m.especie, m.raza, m.edad
      FROM mascotas m
      WHERE m.veterinario_id = $1
      ORDER BY m.nombre
      `,
      [veterinarioId]
    );

    console.log('Mascotas encontradas:', result.rows); // <-- revisa qué devuelve
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener mascotas', error);
    res.status(500).json({ message: 'Error al obtener mascotas' });
  }
};


exports.registrarMascota = async (req, res) => {
  try {
    const veterinarioId = req.user.id;
    const { nombre, especie } = req.body;

    const result = await pool.query(
      `
      INSERT INTO mascotas (nombre, especie, veterinario_id)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [nombre, especie, veterinarioId]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al registrar mascota', error);
    res.status(500).json({ message: 'Error al registrar mascota' });
  }
};
