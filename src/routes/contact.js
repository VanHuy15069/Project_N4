import express from 'express';
import * as contactController from '../controller/contactController';

const router = express.Router();
router.post('/putContact', contactController.putContact);
router.get('/feedback', contactController.getAllFeedBack);

export default router;
