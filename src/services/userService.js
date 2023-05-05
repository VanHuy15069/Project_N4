import db from '../models';
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
                user.update((user.firstName = data.firstName), { where: { data: data } });
                user.update((user.lastName = data.lastName), { where: { data: data } });
                user.update((user.phoneNumber = data.phoneNumber), { where: { data: data } });
                user.update((user.address = data.address), { where: { data: data } });
                user.update((user.email = data.email), { where: { data: data } });
                await user.save();
                resolve(user);
            } else {
                resolve({});
            }
        } catch (error) {
            reject(error);
        }
    });
