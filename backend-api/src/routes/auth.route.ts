import { Router } from 'express';
import { loginHandler, registerHandler } from '../controllers/auth.controller';

const router = Router()

router.post("/sign-up", registerHandler);
router.post("/sign-in", loginHandler);

export default router;