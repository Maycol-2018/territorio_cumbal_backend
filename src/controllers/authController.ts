import { Request, Response } from 'express';
import { login, register, toPublicUser } from '../services/authService';

export const registerController = async (req: Request, res: Response) => res.status(201).json(await register(req.body));
export const loginController = async (req: Request, res: Response) => res.json(await login(req.body));
export const meController = (req: Request, res: Response) => res.json({ user: toPublicUser(req.user!) });
export const logoutController = (_req: Request, res: Response) => res.json({ message: 'Sesión cerrada correctamente.' });
