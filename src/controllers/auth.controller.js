const authService = require('../services/auth.service');

const register = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    const result = await authService.register(nombre, email, password);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await authService.login(email, password);
  if (!result) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  res.json(result);
};

module.exports = { register, login };
