import { Request, Response } from 'express';
import * as CommentService from '../services/commentService';
import * as TaskService from '../services/taskService';

interface AuthenticatedRequest extends Request {
  user?: { id: number; role: string };
}

export async function createComment(req: AuthenticatedRequest, res: Response) {
  try {
    const taskId = Number(req.params.taskId);
    const user = req.user;
    if (!user)
      return res.status(403).json({ message: 'Não autenticado' });

    const task = await TaskService.getTaskById(taskId);
    if (!task)
      return res.status(404).json({ message: 'Tarefa não encontrada' });

    // GUEST só pode comentar na própria tarefa
    if (user.role === 'GUEST' && task.assignedTo !== user.id) {
      return res.status(403).json({ message: 'Convidado não pode comentar nesta tarefa' });
    }

    const { content } = req.body;
    const comment = await CommentService.createComment(taskId, user.id, content);
    res.status(201).json(comment);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export async function getComments(req: Request, res: Response) {
  try {
    const taskId = Number(req.params.taskId);
    const comments = await CommentService.getCommentsByTask(taskId);
    res.json(comments);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export async function deleteComment(req: AuthenticatedRequest, res: Response) {
  try {
    const commentId = Number(req.params.commentId);
    const user = req.user;
    if (!user)
      return res.status(403).json({ message: 'Não autenticado' });

    await CommentService.deleteComment(commentId, user.id, user.role);
    res.status(204).send();
  } catch (error: any) {
    res.status(403).json({ message: error.message });
  }
}
