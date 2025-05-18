
import express from 'express';
import {
  createTask,
  getTaskById,
  getTasksByAssignee,
  updateTask,
  deleteTask
} from '../controllers/taskController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authenticateToken, createTask);
router.get('/:id', authenticateToken, authenticateToken, getTaskById);
router.get('/', authenticateToken, authenticateToken, getTasksByAssignee);
router.put('/:id', authenticateToken, updateTask);
router.delete('/:id', authenticateToken, deleteTask);  // Verificação adicional no service

export default router;
