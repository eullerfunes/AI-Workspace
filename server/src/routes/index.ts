import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import authRoutes from './auth.routes';
import clientRoutes from './client.routes';
import barberRoutes from './barber.routes';
import serviceRoutes from './service.routes';
import appointmentRoutes from './appointment.routes';

const router = Router();

// Rotas públicas
router.use('/auth', authRoutes);

// Rotas protegidas (requerem autenticação)
router.use('/clients', authenticate, clientRoutes);
router.use('/barbers', authenticate, barberRoutes);
router.use('/services', authenticate, serviceRoutes);
router.use('/appointments', authenticate, appointmentRoutes);

export default router;