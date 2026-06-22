import { Router } from 'express';
import { appointmentController } from '../controllers/appointment.controller';

const router = Router();

router.get('/', appointmentController.list);
router.get('/:id', appointmentController.getById);
router.post('/', appointmentController.create);
router.put('/:id', appointmentController.update);
router.patch('/:id/status', appointmentController.updateStatus);
router.delete('/:id', appointmentController.delete);

export default router;