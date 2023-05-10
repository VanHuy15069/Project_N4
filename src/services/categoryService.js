import db from '../models';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config({ path: './env.example' });

export const getCategory = () =>
    new Promise(async (resolve, reject) => {
        try {
            const cate = await db.Categories.findAll({
                raw: true,
            });
            const token =
                cate && jwt.sign({ id: cate.id, name: cate.name }, process.env.ACCESS_SECRET_KEY, { expiresIn: '2d' });
            resolve({
                cate: cate,
                err: token ? 0 : 2,
                msg: token ? 'Category is successfully' : 'category is failed',
                token: token || null,
            });
        } catch (error) {
            reject(error);
        }
    });

export const addCategory = (data) =>
    new Promise(async (resolve, reject) => {
        try {
            const cate = await db.Categories.findOrCreate({
                where: { name: data },
                defaults: {
                    name: data.name,
                },
            });
            const token =
                cate[1] &&
                jwt.sign({ id: cate[1].id, name: cate[1].name }, process.env.ACCESS_SECRET_KEY, { expiresIn: '2d' });
            resolve({
                cate: cate,
                err: token ? 0 : 2,
                msg: token ? 'addCategory is successful' : 'addCategory is not successful',
                token: token || null,
            });
        } catch (error) {
            reject(error);
        }
    });

//nam gioi
export const getCategoryMale = () =>
    new Promise(async (resolve, reject) => {
        try {
            const cate = await db.Categories.findAll({
                attributes: ['id', 'name'],
                include: [
                    {
                        model: db.Product,
                        as: 'ProductDetails',
                        attributes: ['id', 'title', 'image', 'price'],
                    },
                ],
                where: { id: 1 },
            });
            resolve({
                cate: cate,
            });
        } catch (error) {
            reject(error);
        }
    });

//nu gioi
export const getCategoryFemale = () =>
    new Promise(async (resolve, reject) => {
        try {
            const cate = await db.Categories.findAll({
                attributes: ['id', 'name'],
                include: [
                    {
                        model: db.Product,
                        as: 'ProductDetails',
                        attributes: ['id', 'title', 'image', 'price'],
                    },
                ],
                where: { id: 2 },
            });
            resolve({
                cate: cate,
            });
        } catch (error) {
            reject(error);
        }
    });

//updateCategory
export const updateCategory = (data) =>
    new Promise(async (resolve, reject) => {
        try {
            const findId = await db.Categories.findOne({ where: { id: data.id } });
            if (findId) {
                findId.update((findId.name = data.name), { where: { data: data } });
                await findId.save();
                resolve(findId);
            }
            resolve({});
        } catch (error) {
            reject(error);
        }
    });

//delete category

export const deleteCategoryId = (data) =>
    new Promise(async (resolve, reject) => {
        try {
            const deleteId = await db.Categories.findOne({
                where: { id: data },
            });
            if (deleteId) {
                deleteId.destroy();
                resolve(deleteId);
            }
            resolve({});
        } catch (error) {
            reject(error);
        }
    });
