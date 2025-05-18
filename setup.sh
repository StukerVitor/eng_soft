#!/usr/bin/env bash
# Initial setup script for backend and frontend
set -e

echo "=== Backend setup ==="
cd api
npm install
npx prisma generate --schema=src/prisma/schema.prisma
npx prisma db push --schema=src/prisma/schema.prisma
npx ts-node src/prisma/seed.ts
npm install --save-dev @types/swagger-ui-express @types/cors@latest @types/winston ts-jest @types/jest jest supertest @types/supertest ts-node-dev
npm install cors winston bcrypt jsonwebtoken morgan
echo "Backend ready."

echo "=== Frontend setup ==="
cd ../web
npm install
npm install -D @vitejs/plugin-react @types/react @types/react-dom @tailwindcss/postcss
npm install react-icons
echo "Frontend ready."

echo "All set! Run 'npm run dev' inside api and web folders to start."
