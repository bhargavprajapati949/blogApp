import express from 'express';
import { register, login, getUserDetails } from '../controllers/authController.js';
import { validateSchema } from '../middleware/payloadValidator.js';
import { createUserSchema, loginSchema } from './schemas/auth.js'
import { authenticateJWT } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', validateSchema(createUserSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.get('/user', authenticateJWT(), getUserDetails);

export default router;
