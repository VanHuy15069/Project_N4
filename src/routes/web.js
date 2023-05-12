import authRouter from './auth';
import express from 'express';
import homeController from '../controller/homeController';
import userRouter from './user';
import productRouter from './product';
import categoryRouter from './category';
import orderRouter from './order';
import putContact from './contact';
let router = express.Router();

const initRoutes = (app) => {
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/user', userRouter);
    app.use('/api/v1/product', productRouter);
    app.use('/api/v1/category', categoryRouter);
    app.use('/api/v1/order', orderRouter);
    app.use('/api/v1/contact', putContact);
    router.get('/crud', homeController.getCRUD);

    return app.use('/', router);
};

export default initRoutes;
