import express from 'express';
import bodyParser from 'body-parser';
import configViewEngine from './configs/viewEngine';
require('dotenv').config();
import connectDB from './/config/connectDB';
import initRoutes from './routes/web';

const app = express();
const port = process.env.PORT || 2077;
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type,Accept, Authorization ,token',
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE,PUT,OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
configViewEngine(app);

initRoutes(app);

// static images folder
app.use('/Images', express.static('./Images'));
//kết nối với cơ sở dữ liệu
connectDB();

app.listen(port, () => {
    console.log('NodeJS is running on localhost:' + port);
});
