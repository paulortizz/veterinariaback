const express = require('express');
const router = express.Router();

const {
  misMascotas,
  registrarMascota
} = require('../controllers/mascotas.controller');

const authMiddleware = require('../middlewares/auth.middleware');

// VER mis mascotas
router.get('/mias', authMiddleware, misMascotas);

// REGISTRAR mascota
router.post('/', authMiddleware, registrarMascota);

module.exports = router;
