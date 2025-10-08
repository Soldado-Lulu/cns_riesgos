import 'dotenv/config';

export const config = {
  port: Number(process.env.PORT || 4000),
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER || 'postgres',
    pass: process.env.DB_PASS || '12345',
    name: process.env.DB_NAME || 'sigac',
  },
};
