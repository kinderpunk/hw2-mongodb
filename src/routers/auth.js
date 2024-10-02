import express from 'express';
import { register, login, refreshSession, logout } from '../controllers/auth.js';
import validateBody from '../middlewares/validateBody.js';
import { userRegisterSchema, userLoginSchema } from '../validations/authValidation.js';

const router = express.Router();

// Маршрут для реєстрації користувача
router.post('/register', validateBody(userRegisterSchema), register);

// Маршрут для логіну користувача
router.post('/login', validateBody(userLoginSchema), login);

// Маршрут для оновлення сесії
router.post('/refresh', refreshSession);

// Маршрут для логауту користувача
router.post('/logout', logout);

export default router;
