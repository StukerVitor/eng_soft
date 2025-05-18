import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });  // garante que código app leia o banco de teste

process.env.NODE_ENV = 'test';
