import prisma from "../lib/prisma";

export async function createTask(data: any) {
  return prisma.task.create({ data });
}

export async function getTaskById(id: number) {
  return prisma.task.findUnique({
    where: { id },
    include: {
      user: {
        // atribuído
        select: { id: true, name: true },
      },
      comments: {
        include: {
          author: {
            select: { id: true, name: true },
          },
        },
      },
    },
  });
}

export async function getTasks(onlyAssignedTo?: number) {
  return prisma.task.findMany({
    where: onlyAssignedTo ? { assignedTo: onlyAssignedTo } : {},
    include: {
      user: {
        select: { id: true, name: true },
      },
      comments: {
        include: {
          author: {
            select: { id: true, name: true },
          },
        },
      },
    },
  });
}

export async function updateTask(id: number, data: any) {
  return prisma.task.update({
    where: { id },
    data,
  });
}

export async function deleteTask(id: number, userId: number, role: string) {
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) throw new Error("Tarefa não encontrada");

  if (role !== "ADMIN" && task.assignedTo !== userId) {
    throw new Error("Você não tem permissão para deletar esta tarefa");
  }

  return prisma.task.delete({
    where: { id },
  });
}

export async function completeTask(id: number, userId: number, role: string) {
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) throw new Error("Tarefa não encontrada");

  if (role !== "ADMIN" && task.assignedTo !== userId) {
    throw new Error("Você não tem permissão para completar esta tarefa");
  }

  return prisma.task.update({
    where: { id },
    data: { status: "DONE" },
  });
}
