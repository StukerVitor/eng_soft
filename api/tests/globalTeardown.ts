import prisma from '../src/lib/prisma';

export default async () => {
  await prisma.$disconnect();
};
