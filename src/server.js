import express from 'express';
import bodyParser from 'body-parser';
import configViewEngine from './configs/viewEngine';
import initWebRoutes from './route/web';
require('dotenv').config();
import connectDB from './/config/connectDB';
import initRoutes from './route/web';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
configViewEngine(app);

initRoutes(app);

//kết nối với cơ sở dữ liệu
connectDB();

const port = process.env.PORT || 2077;
app.listen(port, () => {
    console.log('NodeJS is running on localhost:' + port);
});
