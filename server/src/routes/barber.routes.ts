import { Router } from 'express';
import { barberController } from '../controllers/barber.controller';

const router = Router();

router.get('/', barberController.list);
router.get('/:id', barberController.getById);
router.post('/', barberController.create);
router.put('/:id', barberController.update);
router.delete('/:id', barberController.delete);

export default router;