import { pool } from '../db.js';

export async function list(_req, res) {
  const { rows } = await pool.query('SELECT * FROM assets ORDER BY id ASC');
  res.json(rows);
}

export async function create(req, res) {
  const { tag, name, category, acquisition_cost, acquisition_date, cost_center_id } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO assets(tag, name, category, acquisition_cost, acquisition_date, cost_center_id)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [tag, name, category, acquisition_cost, acquisition_date, cost_center_id]
    );
    res.status(201).json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'No se pudo crear el activo' });
  }
}
