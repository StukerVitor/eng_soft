import { Request, Response } from 'express';
import * as UserService from '../services/userService';
import { getUserById } from '../services/userService'; // necessário para getCurrentUser

// Corrigir o tipo de req.user
interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    role: string;
    email: string;
  };
}

export async function createUser(req: Request, res: Response) {
  try {
    const { name, email, password, role } = req.body;
    const user = await UserService.createUser(name, email, password, role);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateUser(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const user = await UserService.updateUser(id, req.body);
  res.json(user);
}

export async function deleteUser(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  await UserService.deleteUser(id);
  res.json({ message: 'Usuário excluído com sucesso' });
}

export async function getCurrentUser(req: AuthenticatedRequest, res: Response) {
  if (!req.user?.id) {
    return res.status(400).json({ message: 'ID de usuário não fornecido' });
  }

  const user = await getUserById(req.user.id); // obtém usuário pelo ID autenticado
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  res.json(user);
}
