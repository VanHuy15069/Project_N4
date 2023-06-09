import db from '../models';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: './env.example' });

export const addOrderDetails = (data) => new Promise(async(resolve, reject)=>{
    try {
        const orderDetail = await db.orderDetails.create(data);
        resolve(orderDetail);
    } catch (error) {
        reject(error);
    }
})

export const getOrderDetails = (id)=> new Promise(async(resolve, reject)=>{
    try {
        const data = await db.orderDetails.findOne({
            where : {userId : id},
            attributes : ['userId','fullName','address','phoneNumber','email','note','status','createdAt'],
            include :[{
                model : db.User,
                as : 'userOd',
                attributes : ['id'],
                include:{
                    model : db.Order,
                    as :'userInfo',
                    attributes :['id','userId','productId','quantity','priceTotal']
                }
            }]
        })
        resolve(data);
    } catch (error) {
        reject(error);
    }
})

export const deleteOrderDetail = (id)=> new Promise(async(resolve, reject) => {
    try {
        const response = await db.orderDetails.findOne({
            where :{id : id}
        })
        if(response){
            response.destroy();
            resolve(response);
        }
        reject();
    } catch (error) {
        reject(error);
    }
})


export const getAllOrderDetails = () =>
    new Promise(async (resolve, reject) => {
        try {
            const data = await db.orderDetails.findAll({
                raw: true,
            });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });