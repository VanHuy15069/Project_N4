import express from 'express';
import * as productController from '../controller/productController';
const router = express.Router();

//get product
router.get('/getProduct', productController.getAllProduct);
router.get('/getProductCategory', productController.getProductCategory);
router.post('/addProduct', productController.upload, productController.addProduct);
router.put('/:id', productController.updateProduct);
router.delete(':id', productController.deleteProduct);
export default router;
