// src/controllers/auth.controller.js
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model.js';
import { generateToken } from '../libs/jwt.js';

export async function register(req, res) {
  const { full_name, email, password, user_role } = req.body;
  if (!email || !password || !full_name)
    return res.status(400).json({ message: 'Faltan datos obligatorios' });

  const exists = await UserModel.findByEmail(email);
  if (exists) return res.status(400).json({ message: 'El usuario ya existe' });

  const password_hash = await bcrypt.hash(password, 10);
  const user = await UserModel.create({ full_name, email, password_hash, user_role });

  res.status(201).json({
    id: user.id,
    full_name: user.full_name,
    email: user.email,
    user_role: user.user_role,
    is_active: user.is_active
  });
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email y contraseña requeridos' });

  const user = await UserModel.findByEmail(email);
  if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

  // 🚫 Bloquear si está inactivo
  if (user.is_active === false) {
    return res.status(403).json({ message: 'Usuario inactivo. Contacte al administrador.' });
  }

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ message: 'Credenciales inválidas' });

  const token = generateToken(user); // asegúrate que incluye { id, user_role, email }

  res.json({
    token,
    user: {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      user_role: user.user_role,
      is_active: user.is_active, // opcional, útil en el front
    },
  });
}
