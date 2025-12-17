const express = require('express');
const cors = require('cors');
const citasRoutes = require('./routes/citas.routes');

const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/citas', citasRoutes);

app.get('/', (req, res) => {
  res.send('API VetPanel funcionando');
});

module.exports = app;
