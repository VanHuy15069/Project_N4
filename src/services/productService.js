import db from '../models';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
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

export const getProductCategory = () =>
    new Promise(async (resolve, rejects) => {
        try {
            const productCategory = await db.Product.findAll({
                attributes: ['categoryId', 'title', 'image', 'price', 'weight', 'supplier', 'summary', 'quantity'],
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
                productCategory: productCategory,
            });
        } catch (error) {
            rejects(error);
        }
    });
