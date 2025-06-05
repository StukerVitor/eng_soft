import { Request, Response } from "express";
import * as TaskService from "../services/taskService";

interface AuthenticatedRequest extends Request {
  user?: { id: number; role: string };
}

export async function createTask(req: AuthenticatedRequest, res: Response) {
  try {
    const assignedTo = req.user?.id;
    if (!assignedTo)
      return res.status(400).json({ message: "Usuário não autenticado" });

    const task = await TaskService.createTask({ ...req.body, assignedTo });
    res.status(201).json(task);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function getTasksByAssignee(
  req: AuthenticatedRequest,
  res: Response
) {
  const role = req.user?.role;
  const filterId = role === "GUEST" ? req.user?.id : undefined;
  const tasks = await TaskService.getTasks(filterId);
  res.json(tasks);
}

export async function getTaskById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const task = await TaskService.getTaskById(id);
  if (!task) return res.status(404).json({ message: "Tarefa não encontrada" });
  res.json(task);
}

export async function updateTask(req: Request, res: Response) {
  const id = Number(req.params.id);
  const updated = await TaskService.updateTask(id, req.body);
  res.json(updated);
}

export async function deleteTask(req: AuthenticatedRequest, res: Response) {
  const id = Number(req.params.id);
  const user = req.user;
  if (!user) return res.status(403).json({ message: "Não autorizado" });

  try {
    await TaskService.deleteTask(id, user.id, user.role);
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function markAsDone(req: AuthenticatedRequest, res: Response) {
  const taskId = Number(req.params.id);
  const id = Number(req.params.id);
  const user = req.user;
  if (!user) return res.status(403).json({ message: "Não autorizado" });

  try {
    await TaskService.completeTask(id, user.id, user.role);
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}
