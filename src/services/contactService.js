import db from '../models';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config({ path: './env.example' });

export const addContact = (data) =>
    new Promise(async (resolve, reject) => {
        try {
            const contact = await db.Contact.findOrCreate({
                where: { phoneNumber: data.phoneNumber },
                defaults: {
                    //fullName,phoneNumber,address,email,note
                    fullName: data.fullName,
                    phoneNumber: data.phoneNumber,
                    address: data.address,
                    email: data.email,
                    note: data.note,
                },
            });
            if (contact) {
                resolve(contact);
            }
        } catch (error) {
            reject(error);
        }
    });

export const getContact = () =>
    new Promise(async (resolve, reject) => {
        try {
            const contact = await db.Contact.findAll();
            resolve(contact);
        } catch (error) {
            reject(error);
        }
    });
export const deleteContact = (data) =>
    new Promise(async (resolve, reject) => {
        try {
            const contactId = await db.Contact.findOne({
                where: { id: data },
            });
            if (contactId) {
                contactId.destroy();
                resolve(contactId);
            } else {
                resolve({});
            }
        } catch (error) {
            reject(error);
        }
    });
