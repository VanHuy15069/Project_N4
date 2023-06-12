import db from '../models';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Op } from 'sequelize';
import fs from 'fs';
import path from 'path';
dotenv.config({ path: './env.example' });

// add product
export const addProduct = (data, image) =>
    new Promise(async (resolve, reject) => {
        try {
            const product = await db.Product.findOrCreate({
                where: { title: data.title },
                defaults: {
                    categoryId: data.categoryId,
                    title: data.title,
                    image: image,
                    price: data.price,
                    weight: data.weight,
                    supplier: data.supplier,
                    summary: data.summary,
                    quantity: data.quantity,
                },
            });
            const token =
                product &&
                jwt.sign({ title: product.title, price: product.price }, process.env.ACCESS_SECRET_KEY, {
                    expiresIn: '2d',
                });
            resolve({
                product: product,
                token: token ? 'Add product is successfully' : 'add product failed',
                msg: token ? 0 : 2,
                token: token || null,
            });
        } catch (error) {
            reject(error);
        }
    });

//getAllProducts
export const getAllProduct = () =>
    new Promise(async (resolve, reject) => {
        try {
            const product = await db.Product.findAll({
                raw: true,
            });
            const token =
                product &&
                jwt.sign({ title: product.title, price: product.price }, process.env.ACCESS_SECRET_KEY, {
                    expiresIn: '2d',
                });
            resolve({
                product: product,
                token: token ? 'getAllProduct is successfully' : 'add product failed',
                msg: token ? 0 : 2,
                token: token || null,
            });
        } catch (error) {
            reject(error);
        }
    });

// kết nối một với nhiều mối quan hệ Sản phẩm và danh muc

export const getProductDetails = (id) =>
    new Promise(async (resolve, rejects) => {
        try {
            const details = await db.Product.findOne({
                where: { id: id },
                attributes: [
                    'id',
                    'categoryId',
                    'title',
                    'image',
                    'price',
                    'weight',
                    'supplier',
                    'summary',
                    'quantity',
                ],
                include: [
                    {
                        model: db.Categories,
                        as: 'ProductDetails',
                        attributes: ['id', 'name'],
                    },
                ],
                // where: { id: 5 },
            });
            resolve({
                details: details,
            });
        } catch (error) {
            rejects(error);
        }
    });

export const deleteProduct = (data) =>
    new Promise(async (resolve, reject) => {
        try {
            const dp = await db.Product.findOne({
                where: { id: data.id },
            });
            const clearPath = path.resolve(__dirname, '..', '', `Images/${dp.image}`);
            if (dp) {
                await fs.unlinkSync(clearPath);
                console.log(clearPath);
                await dp.destroy();
                resolve(dp);
            }
            resolve({});
        } catch (error) {
            reject(error);
        }
    });

// update
export const updateProduct = (data) =>
    new Promise(async (resolve, reject) => {
        try {
            const up = await db.Product.findOne({
                where: { id: data.id },
            });
            const clearImage = path.resolve(__dirname, '..', '', `Images/${up.image}`);
            await fs.unlinkSync(clearImage);
            if (up) {
                // categoryId, title,image, price, weight, supplier, summary, quantity
                up.update(((up.categoryId = data.categoryId), { where: { data: data } }));
                up.update(((up.title = data.title), { where: { data: data } }));
                up.update(((up.image = data.image), { where: { data: data } }));
                up.update(((up.price = data.price), { where: { data: data } }));
                up.update(((up.weight = data.weight), { where: { data: data } }));
                up.update(((up.supplier = data.supplier), { where: { data: data } }));
                up.update(((up.summary = data.summary), { where: { data: data } }));
                up.update(((up.quantity = data.quantity), { where: { data: data } }));
                await up.save();
                resolve(up);
            }
            resolve({});
        } catch (error) {
            reject(error);
        }
    });

//tìm kiếm tên sản phẩm
export const getTitleFilter = ({ page, limit, sort, title, ...query }) =>
    new Promise(async (resolve, reject) => {
        try {
            // page,limit ,title truyền theo params
            //limit số lượng muốn lấy của sản phẩm
            const queries = { raw: true, nest: true };
            //phân trang
            const offset = !page || +page <= 1 ? 0 : +page - 1;
            //láy số lượng sản phẩm
            const fLimit = +limit || +process.env.Limit_Product;
            queries.offset = offset * fLimit;
            queries.limit = fLimit;
            //sắp xếp truyền theo params
            if (sort) queries.sort = [sort];
            //filter theo tên
            if (title) query.title = { [Op.substring]: title };
            const response = await db.Product.findAndCountAll({
                where: query,
                ...queries,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

    export const updateQuantityProduct = (data) => new Promise(async(resolve, reject) => {
        try {
            const findId = await db.Product.findOne({
                where : {id : data.id}
            })
            if(data){
                findId.update((findId.quantity = Number(data.quantity) + findId.quantity), { where: { data: data } });
                await findId.save();
                resolve(findId);
            }
            reject();
        } catch (error) {
            reject();
        }
    })