import { verifyToken } from '../libs/jwt.js';

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Token requerido' });
  }

  try {
    const payload = verifyToken(token);
    req.user = payload; // queda disponible en el request
    next();
  } catch (err) {
    console.error('JWT error:', err.message);
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
}

/**
 * Middleware para permitir solo ciertos roles (ej. admin)
 */
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user?.user_role) {
      return res.status(403).json({ message: 'Usuario sin rol asignado' });
    }
    if (!roles.includes(req.user.user_role)) {
      return res.status(403).json({ message: 'Acceso denegado: requiere rol ' + roles.join(', ') });
    }
    next();
  };
}
