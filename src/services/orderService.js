import db from '../models';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: './env.example' });

export const addOrder = (data) =>
    new Promise(async (resolve, reject) => {
        try {
            const order = await db.Order.findOrCreate({
                where: { productId: data.productId, userId: data.userId },
                defaults: {
                    userId: data.userId,
                    productId: data.productId,
                    quantity: data.quantity,
                    priceTotal: data.priceTotal,
                },
            });
            resolve(order);
        } catch (error) {
            reject(error);
        }
    });

export const getOrder = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const order = await db.Order.findAll({
                where: { userId: id },
                attributes: ['id', 'userId', 'productId', 'quantity', 'priceTotal','deleted'],
                include: [
                    {
                        model: db.User,
                        as: 'userInfo',
                        attributes: ['id', 'phoneNumber', 'address'],
                    },
                    {
                        model: db.Product,
                        as: 'productInfo',
                        attributes: ['id', 'title', 'image', 'price', 'quantity'],
                    },
                ],
            });
            resolve(order);
        } catch (error) {
            reject(error);
        }
    });

export const deleteOrder = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const data = await db.Order.findOne({
                where: { id: id },
            });
            if (data) {
                data.destroy();
                resolve(data);
            }
        } catch (error) {
            reject(error);
        }
    });



export const updateOrder = (data) => new Promise(async(resolve, reject) => {
    try {
        const findId = await db.Order.findOne({
            where : {id : data.id}
        })
        if(data){
            findId.update((findId.quantity = data.quantity), { where: { data: data } });
            findId.update((findId.deleted = data.deleted), { where: { data: data } });
            await findId.save();
            resolve(findId);
        }
        reject();
    } catch (error) {
        reject();
    }
})