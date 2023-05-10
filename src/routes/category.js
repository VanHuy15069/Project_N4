import * as categoryController from '../controller/categoryController';
import express from 'express';
const router = express.Router();

//get category
router.get('/getCategory', categoryController.getCategory);
router.get('/getCategoryMale', categoryController.getCategoryMale);
router.get('/getCategoryFeMale', categoryController.getCategoryFemale);
router.post('/addCategory', categoryController.addCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategoryId);

export default router;
