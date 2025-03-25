// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  // Obtener token de cookies, headers o query params
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1] || req.query.token;
  
  if (!token) {
    return res.status(401).json({ error: "Acceso no autorizado. Por favor inicie sesión." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Error al verificar token:", error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: "Sesión expirada. Por favor inicie sesión nuevamente." });
    }
    
    return res.status(401).json({ error: "Token inválido" });
  }
};

// Middleware para redirigir usuarios autenticados
exports.redirectIfAuthenticated = (req, res, next) => {
  const token = req.cookies.token;
  
  if (token) {
    try {
      jwt.verify(token, process.env.SECRET_KEY);
      return res.redirect('/');
    } catch (error) {
      // Token inválido, continuar
    }
  }
  next();
};