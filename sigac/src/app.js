import express from 'express';
import morgan from 'morgan';
import cors from 'cors'; // ✅ ahora sí disponible
import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js'; // si tienes

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS,PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

export default app;
