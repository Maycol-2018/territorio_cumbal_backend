import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => (req: Request, _res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const errors = Object.fromEntries(result.error.issues.map((issue) => [issue.path.join('.') || 'body', issue.message]));
    return next(Object.assign(new Error('Los datos enviados no son válidos.'), { statusCode: 400, details: errors }));
  }
  req.body = result.data;
  next();
};
