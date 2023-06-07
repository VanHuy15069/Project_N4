import express from 'express';
import * as contactController from '../controller/contactController';

const router = express.Router();
router.post('/addContact', contactController.addContact);
router.get('/getContact', contactController.getContact);
router.delete('/:id', contactController.deleteContact);

export default router;
