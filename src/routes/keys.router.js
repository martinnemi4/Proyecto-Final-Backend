import {Router} from 'express';
import keysControllers from '../controllers/keys.controllers.js';

const router = Router();

router.get('/', keysControllers.getKeys);
router.get('/:kid', keysControllers.getKeyBy);
router.post('/', keysControllers.createKey);

export default router;