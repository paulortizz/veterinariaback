const pool = require('../config/db');

/* =========================
   CREAR CITA
========================= */
exports.crearCita = async (req, res) => {
  try {
    const veterinario_id = req.user.id;
    const { mascota_id, fecha, hora, motivo } = req.body;

    if (!mascota_id || !fecha || !hora || !motivo) {
      return res.status(400).json({ message: 'Faltan datos' });
    }

    const result = await pool.query(
      `
      INSERT INTO citas (mascota_id, veterinario_id, fecha, hora, motivo)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [mascota_id, veterinario_id, fecha, hora, motivo]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('ERROR CREAR CITA:', error);
    res.status(500).json({ message: 'Error al crear cita' });
  }
};

/* =========================
   OBTENER MIS CITAS
========================= */
exports.misCitas = async (req, res) => {
  try {
    const veterinarioId = req.user.id;

    const result = await pool.query(
      `
      SELECT c.id, c.fecha, c.hora, c.estado, c.motivo,
             m.nombre AS mascota
      FROM citas c
      JOIN mascotas m ON m.id = c.mascota_id
      WHERE c.veterinario_id = $1
      ORDER BY c.fecha DESC, c.hora DESC
      `,
      [veterinarioId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener citas' });
  }
};

/* =========================
   ACTUALIZAR ESTADO
========================= */
exports.actualizarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    await pool.query(
      `UPDATE citas SET estado = $1 WHERE id = $2`,
      [estado, id]
    );

    res.json({ message: 'Estado actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar estado' });
  }
};
