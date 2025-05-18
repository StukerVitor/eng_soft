import prisma from '../lib/prisma';
import bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

export async function createUser(name: string, email: string, password: string, role: string = 'USER') {
  const hashedPassword = await bcrypt.hash(password, 10);
  const finalRole: Role = Object.values(Role).includes(role as Role) ? role as Role : Role.USER;

  return prisma.user.create({
    data: { name, email, password: hashedPassword, role: finalRole }
  });
}

export async function updateUser(id: number, data: any) {
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) throw new Error("Usuário não encontrado");
  return prisma.user.update({ where: { id }, data });
}

export async function deleteUser(id: number) {
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) throw new Error("Usuário não encontrado");
  return prisma.user.update({
    where: { id },
    data: { email: `deleted_${id}@example.com` }
  });
}

export async function getUserById(id: number) {
  return prisma.user.findUnique({ where: { id } });
}
