import express from 'express';
import {
  createUser,
  updateUser,
  deleteUser,
  getCurrentUser
} from '../controllers/userController';
import { authenticateToken, authorizeRoles } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', createUser);
router.get('/me', authenticateToken, getCurrentUser);
router.put('/:id', authenticateToken, updateUser);
router.delete('/:id', authenticateToken, authorizeRoles('ADMIN'), deleteUser);

export default router;
