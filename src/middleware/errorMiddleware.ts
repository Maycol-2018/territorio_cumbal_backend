import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

export const asyncHandler = (handler: (req: Request, res: Response, next: NextFunction) => unknown) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

export const notFound = (_req: Request, _res: Response, next: NextFunction) => next(Object.assign(new Error('Ruta no encontrada.'), { statusCode: 404 }));

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  let statusCode = error.statusCode ?? 500;
  let message = error.message ?? 'Ha ocurrido un error inesperado.';
  let errors = error.details;
  if (error.code === 'USERNAME_EXISTS') statusCode = 409;
  if (error.code === 'INVALID_CREDENTIALS') statusCode = 401;
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
    statusCode = 409;
    message = 'Ese nombre de usuario ya está registrado.';
  }
  if (statusCode >= 500) { message = 'Ha ocurrido un error inesperado.'; errors = undefined; }
  res.status(statusCode).json(errors ? { message, errors } : { message });
};
