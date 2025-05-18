// tests/globalSetup.ts
import { execSync } from 'child_process';
import dotenv from 'dotenv';

export default async () => {
  // 1. carrega variáveis de teste
  dotenv.config({ path: '.env.test' });

  // 2. garante fallback caso a variável não exista
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = 'file:./test.db';
  }

  // 3. sincroniza o schema APENAS no banco de testes
  execSync(
    'npx prisma db push --force-reset --schema=src/prisma/schema.prisma',
    { stdio: 'inherit', env: process.env },   // usa o ambiente já modificado
  );
};
