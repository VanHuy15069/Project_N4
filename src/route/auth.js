import express from 'express';
import * as authController from '../controller/auth';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
export default router;
