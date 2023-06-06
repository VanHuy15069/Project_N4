import db from '../models';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: './.env.example' });

export const addBlog = (data, image) =>
    new Promise(async (resolve, reject) => {
        try {
            const blog = await db.Blog.findOrCreate({
                where: { title: data.title },
                defaults: {
                    title: data.title,
                    image: image,
                    contentHTML: data.contentHTML,
                    contentHTMLMarkdown: data.contentHTMLMarkdown,
                },
            });
            const token =
                blog &&
                jwt.sign({ title: blog.title }, process.env.ACCESS_SECRET_KEY, {
                    expiresIn: '2d',
                });
            resolve({
                blog: blog,
                token: token ? 'Add blog is success' : 'Failed',
                msg: token ? 0 : 2,
                token: token || null,
            });
        } catch (err) {
            reject(err);
        }
    });

export const getAllBlog = () =>
    new Promise(async (resolve, reject) => {
        try {
            const blog = await db.Blog.findAll({
                raw: true,
            });
            const token =
                blog &&
                jwt.sign({ title: blog.title }, process.env.ACCESS_SECRET_KEY, {
                    expiresIn: '2d',
                });
            resolve({
                blog: blog,
                token: token ? 'GET ALL BLOG SUCCESS' : 'FAILED',
                msg: token ? 0 : 2,
                token: token || null,
            });
        } catch (err) {
            reject(err);
        }
    });

export const deleteBlog = (data) =>
    new Promise(async (resolve, reject) => {
        try {
            const dp = await db.Blog.findOne({
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
        } catch (err) {
            reject(err);
        }
    });

export const updateBlog = (data) =>
    new Promise(async (resolve, rejects) => {
        try {
            const updateBlog = await db.Blog.findOne({
                where: { id: data.id },
            });
            if (updateBlog) {
                updateBlog.update((updateBlog.title = data.title), { where: { data: data } });
                updateBlog.update((updateBlog.contentHTML = data.contentHTML), { where: { data: data } });
                updateBlog.update((updateBlog.contentHTMLMarkdown = data.contentHTMLMarkdown), { where: { data: data } });
                await updateBlog.save();
                resolve(updateBlog);
            }
            resolve({});
        } catch (err) {
            rejects(err);
        }
    });

export const getBlog = () =>
    new Promise(async (resolve, rejects) => {
        try {
            const cate = await db.Blog.findAll({});
        } catch (error) {
            rejects(error);
        }
    });

export const getOneBolg = (id) =>
    new Promise(async (resolve, rejects) => {
        try {
            const data = await db.Blog.findOne({
                where: { id: id },
                attributes: ['id', 'title', 'image', 'contentHTML', 'contentHTMLMarkdown', 'createdAt'],
            });
            if (data == null) {
                resolve({
                    msg: 'ko tim thay id',
                });
            }
            resolve(data);
        } catch (error) {
            rejects(error);
        }
    });
