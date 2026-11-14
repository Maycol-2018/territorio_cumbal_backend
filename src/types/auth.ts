import { User } from '@prisma/client';

export type PublicUser = Omit<User, 'passwordHash' | 'createdAt' | 'updatedAt'>;

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
