import authRouter from './auth';
import express from 'express';
import homeController from '../controller/homeController';
import userRouter from './user';
let router = express.Router();

const initRoutes = (app) => {
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/user', userRouter);
    router.get('/crud', homeController.getCRUD);

    return app.use('/', router);
};

export default initRoutes;
