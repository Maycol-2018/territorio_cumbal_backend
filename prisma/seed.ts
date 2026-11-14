import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Password123!', 12);
  await prisma.user.upsert({ where: { username: 'juan123' }, update: { passwordHash }, create: { nombres: 'Juan', apellidos: 'Pérez', username: 'juan123', celular: '3001234567', vereda: 'Tasmag', passwordHash, role: 'user' } });
  await prisma.corporationMember.deleteMany();
  await prisma.corporationMember.createMany({ data: [
    { section: 'governor', role: 'Gobernador', name: 'Juan Carlos Cuaical', vereda: 'Tasmag', initials: 'JC' },
    { section: 'regidores1', role: 'Regidor', name: 'Miguel Colimba', vereda: 'Guan' }
  ] });
}

main().finally(() => prisma.$disconnect());
