const pool = require('../config/db');

// ============================
// OBTENER MIS MASCOTAS
// ============================
exports.misMascotas = async (req, res) => {
  try {
    const veterinarioId = Number(req.user.id);

    console.log('Usuario que pide mascotas:', veterinarioId);

    const result = await pool.query(
      `
      SELECT id, nombre
      FROM mascotas
      WHERE veterinario_id = $1
      ORDER BY nombre
      `,
      [veterinarioId]
    );

    console.log('Mascotas encontradas:', result.rows);
    res.json(result.rows);

  } catch (error) {
    console.error('Error al obtener mascotas', error);
    res.status(500).json({ message: 'Error al obtener mascotas' });
  }
};

// ============================
// REGISTRAR MASCOTA
// ============================
exports.registrarMascota = async (req, res) => {
  try {
    const veterinarioId = Number(req.user.id);
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ message: 'El nombre es obligatorio' });
    }

    const result = await pool.query(
      `
      INSERT INTO mascotas (nombre, veterinario_id)
      VALUES ($1, $2)
      RETURNING id, nombre
      `,
      [nombre, veterinarioId]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error('Error al registrar mascota', error);
    res.status(500).json({ message: 'Error al registrar mascota' });
  }
};
