import { app } from './app';
import { env } from './config/env';
import { prisma } from './lib/prisma';

const server = app.listen(env.PORT, () => console.log(`API ejecutándose en http://localhost:${env.PORT}`));

const shutdown = async (signal: string) => {
  console.log(`Recibida señal ${signal}. Cerrando servidor...`);
  server.close(async () => { await prisma.$disconnect(); process.exit(0); });
};
process.on('SIGINT', () => void shutdown('SIGINT'));
process.on('SIGTERM', () => void shutdown('SIGTERM'));
