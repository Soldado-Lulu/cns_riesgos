import { pool } from '../db.js';

export const UserModel = {
  async findByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email=$1 LIMIT 1', [email]);
    return rows[0];
  },

  async create({ full_name, email, password_hash, user_role }) {
    const { rows } = await pool.query(
      `INSERT INTO users(full_name, email, password_hash, user_role)
       VALUES ($1,$2,$3,$4)
       RETURNING id, full_name, email, user_role, is_active`,
      [full_name, email, password_hash, user_role || 'user']
    );
    return rows[0];
  },

  async list() {
    const { rows } = await pool.query(
      'SELECT id, full_name, email, user_role, is_active FROM users ORDER BY id ASC'
    );
    return rows;
  }
};
