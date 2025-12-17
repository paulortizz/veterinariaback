const express = require('express');
const router = express.Router();
const { misMascotas } = require('../controllers/mascotas.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/mias', authMiddleware, misMascotas);

module.exports = router;
