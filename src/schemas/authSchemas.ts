import { z } from 'zod';

const text = (label: string, min = 1) => z.string({ required_error: `${label} es obligatorio.` }).trim().min(min, `${label} debe tener al menos ${min} caracteres.`);

export const registerSchema = z.object({
  nombres: text('nombres', 2),
  apellidos: text('apellidos', 2),
  username: z.string({ required_error: 'username es obligatorio.' }).trim().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/, 'username solo puede contener letras, números y guion bajo.').transform((value) => value.toLowerCase()),
  celular: z.string({ required_error: 'celular es obligatorio.' }).trim().regex(/^\+?[0-9][0-9\s-]{6,18}$/, 'celular debe tener un formato válido.'),
  vereda: text('vereda'),
  password: z.string({ required_error: 'password es obligatorio.' }).min(8, 'password debe tener al menos 8 caracteres.')
});

export const loginSchema = z.object({
  username: z.string({ required_error: 'username es obligatorio.' }).trim().min(3).transform((value) => value.toLowerCase()),
  password: z.string({ required_error: 'password es obligatorio.' }).min(1, 'password es obligatorio.')
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
