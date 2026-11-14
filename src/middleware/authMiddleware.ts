import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { prisma } from '../lib/prisma';

export async function requireAuth(req: Request, _res: Response, next: NextFunction) {
  try {
    const header = req.header('Authorization');
    if (!header?.startsWith('Bearer ')) return next(Object.assign(new Error('Se requiere autenticación.'), { statusCode: 401 }));
    const token = header.slice(7).trim();
    if (!token) return next(Object.assign(new Error('Se requiere autenticación.'), { statusCode: 401 }));
    const payload = jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload;
    if (typeof payload.sub !== 'string') throw new Error('Token inválido.');
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) throw new Error('Token inválido.');
    req.user = user;
    next();
  } catch {
    next(Object.assign(new Error('Se requiere autenticación.'), { statusCode: 401 }));
  }
}
