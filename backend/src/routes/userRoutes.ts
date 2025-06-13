import { Router, RequestHandler } from 'express';
import * as userController from '../controllers/userController';
import { authenticateToken } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

router.use(authenticateToken as RequestHandler);
router.get('/profile', userController.getProfile as RequestHandler);
router.put('/profile', userController.updateProfile as RequestHandler);
router.post('/profile-image',
  authenticateToken,
  upload.single('image'),
  userController.uploadProfileImage as RequestHandler);

export default router;
