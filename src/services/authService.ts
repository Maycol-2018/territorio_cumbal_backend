import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { env } from '../config/env';
import { prisma } from '../lib/prisma';
import { LoginInput, RegisterInput } from '../schemas/authSchemas';
import { PublicUser } from '../types/auth';

const SALT_ROUNDS = 12;

export const toPublicUser = (user: User): PublicUser => {
  return {
    id: user.id,
    nombres: user.nombres,
    apellidos: user.apellidos,
    username: user.username,
    celular: user.celular,
    vereda: user.vereda,
    role: user.role
  };
};

export const signToken = (userId: string) => jwt.sign({ sub: userId }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] });

export async function register(input: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { username: input.username } });
  if (existing) {
    const error = new Error('Ese nombre de usuario ya está registrado.');
    (error as Error & { code?: string }).code = 'USERNAME_EXISTS';
    throw error;
  }
  const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);
  const user = await prisma.user.create({ data: {
    nombres: input.nombres,
    apellidos: input.apellidos,
    username: input.username,
    celular: input.celular,
    vereda: input.vereda,
    passwordHash
  } });
  return { user: toPublicUser(user), token: signToken(user.id) };
}

export async function login(input: LoginInput) {
  const user = await prisma.user.findUnique({ where: { username: input.username } });
  if (!user || !(await bcrypt.compare(input.password, user.passwordHash))) {
    const error = new Error('El usuario o la contraseña no son correctos.');
    (error as Error & { code?: string }).code = 'INVALID_CREDENTIALS';
    throw error;
  }
  return { user: toPublicUser(user), token: signToken(user.id) };
}
