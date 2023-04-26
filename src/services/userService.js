import db from '../models';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config({ path: './env.example' });
export const getAllUsers = () =>
    new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findAll({
                raw: true,
            });
            resolve(user);
        } catch (error) {
            reject(error);
        }
    });

export const deleteUser = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: id },
            });
            if (user) {
                await user.destroy();
            }
            resolve(user);
        } catch (error) {
            reject(error);
        }
    });

export const updateUser = (data, id) =>
    new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: id },
            });
            if (user) {
                user.update(
                    (user.firstName = data.firstName),
                    (user.lastName = data.lastName),
                    (user.phoneNumber = data.phoneNumber),
                    (user.address = data.address),
                    (user.email = data.email),
                    { where: { data: data } },
                );
                await user.save();
                resolve(user);
            } else {
                resolve({});
            }
        } catch (error) {
            reject(error);
        }
    });
