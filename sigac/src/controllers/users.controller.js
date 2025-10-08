// src/controllers/users.controller.js
import { pool } from '../db.js';
import bcrypt from 'bcrypt';

export async function list(req, res) {
  const { rows } = await pool.query(
    'SELECT id, full_name, email, user_role, is_active FROM users ORDER BY id ASC'
  );
  res.json(rows);
}

export async function getById(req, res) {
  const { id } = req.params;
  const { rows } = await pool.query(
    'SELECT id, full_name, email, user_role, is_active FROM users WHERE id=$1',
    [id]
  );
  if (!rows.length) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json(rows[0]);
}

export async function create(req, res) {
  const { full_name, email, password, user_role } = req.body;
  const password_hash = await bcrypt.hash(password, 10);
  const { rows } = await pool.query(
    `INSERT INTO users(full_name, email, password_hash, user_role, is_active)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, full_name, email, user_role, is_active`,
    [full_name, email, password_hash, user_role || 'user', true]
  );
  res.status(201).json(rows[0]);
}
/*
export async function update(req, res) {
  const { id } = req.params;
  const { full_name, email, user_role, is_active, password } = req.body;

  const { rows } = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
  if (!rows.length) return res.status(404).json({ message: 'Usuario no encontrado' });

  const current = rows[0];
  let password_hash = current.password_hash;

  if (typeof password === 'string' && password.trim()) {
    password_hash = await bcrypt.hash(password, 10);
  }

  const next_is_active =
    typeof is_active === 'boolean' || is_active === 'true' || is_active === 'false'
      ? (is_active === true || is_active === 'true')
      : current.is_active;

  await pool.query(
    `UPDATE users
     SET full_name=$1, email=$2, user_role=$3, is_active=$4, password_hash=$5, updated_at=now()
     WHERE id=$6`,
    [
      full_name ?? current.full_name,
      email ?? current.email,
      user_role ?? current.user_role,
      next_is_active,
      password_hash,
      id
    ]
  );

  res.json({ message: 'Usuario actualizado correctamente' });
}

export async function updateActive(req, res) {
  const { id } = req.params;
  const active =
    req.body?.is_active === true ||
    req.body?.is_active === 'true' ||
    req.body?.is_active === 1 ||
    req.body?.is_active === '1';

  const result = await pool.query(
    `UPDATE users
     SET is_active = $1, updated_at = now()
     WHERE id = $2
     RETURNING id, is_active`,
    [active, id]
  );

  if (!result.rowCount) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json({ message: 'Estado actualizado', id, is_active: result.rows[0].is_active });
}
*/
export async function update(req, res) {
  const { id } = req.params;
  const { full_name, email, user_role, is_active, password } = req.body;

  const { rows } = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
  if (!rows.length) return res.status(404).json({ message: 'Usuario no encontrado' });

  const current = rows[0];
  let password_hash = current.password_hash;
  if (typeof password === 'string' && password.trim()) {
    password_hash = await bcrypt.hash(password, 10);
  }

  const next_is_active =
    typeof is_active === 'boolean'
      ? is_active
      : is_active === 'true'
      ? true
      : is_active === 'false'
      ? false
      : current.is_active;

  await pool.query(
    `UPDATE users
     SET full_name=$1, email=$2, user_role=$3, is_active=$4, password_hash=$5, updated_at=now()
     WHERE id=$6`,
    [
      full_name ?? current.full_name,
      email ?? current.email,
      user_role ?? current.user_role,
      next_is_active,
      password_hash,
      id
    ]
  );

  res.json({ message: 'Usuario actualizado correctamente' });
}

export async function updateActive(req, res) {
  const { id } = req.params;
  const active =
    req.body?.is_active === true ||
    req.body?.is_active === 'true' ||
    req.body?.is_active === 1 ||
    req.body?.is_active === '1';

  const result = await pool.query(
    `UPDATE users
     SET is_active = $1, updated_at = now()
     WHERE id = $2
     RETURNING id, is_active`,
    [active, id]
  );

  if (!result.rowCount) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json({ message: 'Estado actualizado', id, is_active: result.rows[0].is_active });
}
export async function remove(req, res) {
  const { id } = req.params;
  const result = await pool.query('DELETE FROM users WHERE id=$1', [id]);
  if (!result.rowCount) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json({ message: 'Usuario eliminado correctamente' });
}
