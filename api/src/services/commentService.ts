
import prisma from '../lib/prisma';

export async function createComment(taskId: number, userId: number, content: string) {
  return prisma.comment.create({
    data: {
      content,
      taskId,
      authorId: userId,
    },
    include: { author: { select: { name: true, email: true } } },
  });
}

export async function getCommentsByTask(taskId: number) {
  return prisma.comment.findMany({
    where: { taskId },
    orderBy: { createdAt: 'asc' },
    include: { author: { select: { name: true, email: true } } },
  });
}

export async function deleteComment(commentId: number, userId: number, role: string) {
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment) throw new Error("Comentário não encontrado");

  if (role !== 'ADMIN' && comment.authorId !== userId) {
    throw new Error("Você não tem permissão para deletar este comentário");
  }

  return prisma.comment.delete({ where: { id: commentId } });
}
