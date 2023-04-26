import express from 'express';
import * as userController from '../controller/userController';
import { middlewareController } from '../controller/middlewareController';
const router = express.Router();

//get all user
router.get('/getAllUser', middlewareController.verifyToken, userController.getAllUser);
//delete user
router.delete('/:id', middlewareController.verifyTokenAndAdminAuth, userController.deleteUser);
//edit user
router.put('/:id', userController.updateUser);

export default router;
