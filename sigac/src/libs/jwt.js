import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'clave_super_segura';

/**
 * Genera un token JWT para un usuario.
 */
export function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      user_role: user.user_role
    },
    JWT_SECRET,
    { expiresIn: '1d' } // token válido 1 día
  );
}

/**
 * Verifica un token JWT y devuelve el payload decodificado.
 */
export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

/**
 * Intenta decodificar un token (sin validar expiración o firma).
 */
export function decodeToken(token) {
  return jwt.decode(token);
}
