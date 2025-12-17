const express = require('express');
const router = express.Router();

const {
  crearCita,
  misCitas,
  actualizarEstado
} = require('../controllers/citas.controller');

const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware, crearCita);
router.get('/mias', authMiddleware, misCitas);
router.patch('/:id', authMiddleware, actualizarEstado);

module.exports = router;
