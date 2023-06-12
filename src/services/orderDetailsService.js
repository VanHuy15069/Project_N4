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
            where : {id : id},
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
                raw: true
            });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
    export const updateOrderDetails = (data) => new Promise(async(resolve, reject) => {
        try {
            const findId = await db.orderDetails.findOne({
                where : {id : data.id}
            })
            if(data){
                findId.update((findId.status = data.status), { where: { data: data } });
                await findId.save();
                resolve(findId);
                if(data.status === "Đã duyệt"){
                    const findIdOrder = await db.Order.findAll({
                        where : {userId: findId.userId}
                    })
                    findIdOrder.forEach( async element => {
                        const findProduct = await db.Product.findOne({
                            where : {id: element.productId}
                        })
                        findProduct.update((findProduct.quantity = findProduct.quantity - element.quantity), {where : {data : element}})
                        await findProduct.save()
                    });
                }
            }
            reject();
        } catch (error) {
            reject();
        }
    })