import express from 'express';
import * as orderController from '../controller/orderController';

const router = express.Router();


router.post('/addOder',orderController.addOder);
router.get('/:id',orderController.getOrder);
router.delete('/:id',orderController.deleteOrder);
export default router;
