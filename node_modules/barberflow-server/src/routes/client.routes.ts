import { Router } from 'express';
import { clientController } from '../controllers/client.controller';

const router = Router();

router.get('/', clientController.list);
router.get('/:id', clientController.getById);
router.post('/', clientController.create);
router.put('/:id', clientController.update);
router.delete('/:id', clientController.delete);

export default router;