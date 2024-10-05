import express from 'express';
import { register, login, refreshSession, logout } from '../controllers/auth.js';
import validateBody from '../middlewares/validateBody.js';
import { userRegisterSchema, userLoginSchema } from '../validations/authValidation.js';

const router = express.Router();

router.post('/register', validateBody(userRegisterSchema), register);
router.post('/login', validateBody(userLoginSchema), login);
router.post('/refresh', refreshSession);
router.post('/logout', logout);

export default router;
