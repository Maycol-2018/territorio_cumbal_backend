import { Router } from 'express';
import { loginController, logoutController, meController, registerController } from '../controllers/authController';
import { requireAuth } from '../middleware/authMiddleware';
import { asyncHandler } from '../middleware/errorMiddleware';
import { validate } from '../middleware/validateMiddleware';
import { loginSchema, registerSchema } from '../schemas/authSchemas';

export const authRoutes = Router();
authRoutes.post('/register', validate(registerSchema), asyncHandler(registerController));
authRoutes.post('/login', validate(loginSchema), asyncHandler(loginController));
authRoutes.get('/me', requireAuth, asyncHandler(meController));
authRoutes.post('/logout', requireAuth, asyncHandler(logoutController));
