import express from 'express';
import *as orderDetailsController from '../controller/orderDetailsController'

const router = express.Router();
router.get('/:id',orderDetailsController.getOrderDetails);
router.get('/getOrderDetails/getAll',orderDetailsController.getAllOrderDetails);
router.post('/addOrderDetails',orderDetailsController.addOrderDetails);
router.delete('/:id',orderDetailsController.deleteOrderDetail);
router.put('/:id',orderDetailsController.updateOrderDetails);
export default router;