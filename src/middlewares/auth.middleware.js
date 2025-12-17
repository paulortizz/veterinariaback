const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token requerido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log('JWT DECODED:', decoded);

    // 🔥 ESTA LÍNEA ES LA CLAVE
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};
