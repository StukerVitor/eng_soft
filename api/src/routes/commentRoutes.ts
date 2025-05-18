
import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import {
  createComment,
  getComments,
  deleteComment
} from '../controllers/commentController';

const router = express.Router({ mergeParams: true });

router.post('/:taskId/comments', authenticateToken, createComment);
router.get('/:taskId/comments', authenticateToken, getComments);
router.delete('/:taskId/comments/:commentId', authenticateToken, deleteComment);

export default router;
