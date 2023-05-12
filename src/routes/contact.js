import express from 'express';
import * as contactController from '../controller/contactController';

const router = express.Router();
router.post('/putContact', contactController.putContact);

export default router;
