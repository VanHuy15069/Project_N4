import db from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
require('dotenv').config();
const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const registerService = ({ username, password, firstName, lastName, phoneNumber, address, email }) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.User.findOrCreate({
                where: { username },
                defaults: {
                    username,
                    password: hashPassword(password),
                    firstName,
                    lastName,
                    phoneNumber,
                    address,
                    email,
                },
            });
            const token =
                response[1] &&
                jwt.sign({ password: response[0].password, username: response[0].username }, process.env.SECRET_KEY, {
                    expiresIn: '10',
                });
            resolve({
                err: token ? 0 : 2,
                msg: token ? 'Register is successfully !' : 'username is has been already used !',
                token: token || null,
            });
        } catch (error) {
            reject(error);
        }
    });

export const loginService = ({ username, password, id }) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.User.findOne({
                where: { username },
                defaults: {
                    raw: true,
                },
            });

            const isCorrectPassword = response && bcrypt.compareSync(password, response.password);

            const token =
                isCorrectPassword &&
                jwt.sign({ password: response.password, username: response.username }, process.env.SECRET_KEY, {
                    expiresIn: '10',
                });
            resolve({
                err: token ? 0 : 2,
                msg: token ? 'login is successfully !' : response ? 'password is wrong!' : 'username is not found !',
                token: token || null,
            });
        } catch (error) {
            reject(error);
        }
    });
