import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';
import routes from './routes';

const app = express();

// ─── Segurança ───
app.use(helmet());
app.use(cors({
  origin: env.corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ─── Rate Limiting ───
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  message: {
    status: 'error',
    code: 'RATE_LIMIT',
    message: 'Too many requests, please try again later',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// ─── Parsers ───
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ───
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'success',
    message: 'BarberFlow API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// ─── Routes ───
app.use('/api', routes);

// ─── Error Handling ───
app.use(notFoundHandler);
app.use(errorHandler);

export default app;