import express from 'express';
import * as blogController from '../controller/blogController';
const router = express.Router();

router.post('/addBlog', blogController.upload, blogController.addBlog);
router.get('/getAllBlog', blogController.getAllBlog);
router.delete('/:id', blogController.upload, blogController.deleteBlog);
router.put('/:id', blogController.updateBlog);
router.get('/:id', blogController.getOneBlog);

export default router;
