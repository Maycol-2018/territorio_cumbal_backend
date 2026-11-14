import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/authMiddleware';
import { asyncHandler } from '../middleware/errorMiddleware';

export const userRoutes = Router();
userRoutes.get('/corporacion', requireAuth, asyncHandler(async (_req, res) => {
  const members = await prisma.corporationMember.findMany({ orderBy: { createdAt: 'asc' } });
  const governor = members.find((member) => member.section === 'governor');
  const result = {
    governor: governor ? { role: governor.role, name: governor.name, vereda: governor.vereda, initials: governor.initials ?? '' } : null,
    regidores1: members.filter((member) => member.section === 'regidores1').map(({ role, name, vereda }) => ({ role, name, vereda })),
    regidores2: members.filter((member) => member.section === 'regidores2').map(({ role, name, vereda }) => ({ role, name, vereda })),
    apoyo: members.filter((member) => member.section === 'apoyo').map(({ role, name, vereda }) => ({ role, name, vereda }))
  };
  res.json(result);
}));
