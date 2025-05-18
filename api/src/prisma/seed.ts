import prisma from '../lib/prisma';
import bcrypt from 'bcrypt';
import { Role } from '@prisma/client'; // <-- importa o enum

async function main() {
  const users = [
    {
      name: 'Administrador',
      email: 'admin@admin.com',
      password: 'admin123',
      role: Role.ADMIN, // <-- usa enum, não string
    },
    {
      name: 'Usuário',
      email: 'usuario@usuario.com',
      password: 'usuario123',
      role: Role.USER,
    },
    {
      name: 'Convidado',
      email: 'convidado@convidado.com',
      password: 'convidado123',
      role: Role.GUEST,
    },
  ];

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: user.role,
      },
    });
  }

  console.log('Seed concluído com sucesso.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
