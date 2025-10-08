import pkg from 'pg';
import { config } from './config.js';
const { Pool } = pkg;

export const pool = new Pool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.pass,
  database: config.db.name,
});

export async function testDb() {
  const { rows } = await pool.query('SELECT now() as now');
  console.log('PostgreSQL OK:', rows[0].now);
  console.log('db se conecto perro')
}
