import express from 'express';
import * as productController from '../controller/productController';
const router = express.Router();

//get product
router.get('/getProduct', productController.getAllProduct);
router.get('/getTitle', productController.getTitle);
router.get('/:id', productController.getProductDetails);
router.post('/addProduct', productController.upload, productController.addProduct);
router.put('/:id', productController.upload, productController.updateProduct);
router.delete('/:id', productController.upload, productController.deleteProduct);
router.put('/addQuantity/:id', productController.updateQuantityProduct)
export default router;
