import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { errorHandler, notFound } from './middleware/errorMiddleware';
import { authRoutes } from './routes/authRoutes';
import { userRoutes } from './routes/userRoutes';

export const app = express();
app.use(helmet());
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));
app.use(express.json({ limit: '100kb' }));
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use(notFound);
app.use(errorHandler);
