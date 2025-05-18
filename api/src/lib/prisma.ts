import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url:
        process.env.NODE_ENV === 'test'
          ? process.env.DATABASE_URL        // vem do jestEnv.ts
          : process.env.DATABASE_URL,
    },
  },
});

export default prisma;
