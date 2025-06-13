import { Router } from 'express';
import { RequestHandler } from 'express';
import * as authController from '../controllers/authController';

const router = Router();

router.post('/register', authController.register as RequestHandler);
router.post('/login', authController.login as RequestHandler);
router.post('/forgot-password', authController.forgotPassword as RequestHandler);
router.post('/reset-password', authController.resetPassword as RequestHandler);

export default router;
