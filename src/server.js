import express from 'express';
import bodyParser from 'body-parser';
import configViewEngine from './configs/viewEngine';
import initWebRoutes from './route/web';
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
configViewEngine(app);
initWebRoutes(app);
const port = process.env.PORT;
app.listen(port, () => {
    console.log('It is running on the port: ' + port);
});
