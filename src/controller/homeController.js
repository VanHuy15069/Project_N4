import { json } from 'body-parser';
import db from '../models/index';

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
};

module.exports = {
    getCRUD: getCRUD,
};
