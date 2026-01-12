const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const citasRoutes = require('./routes/citas.routes');
const mascotasRoutes = require('./routes/mascotas.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/citas', citasRoutes);
app.use('/mascotas', mascotasRoutes);

app.get('/', (req, res) => {
  res.send('API VetPanel funcionando');
});

module.exports = app;
