import { resolve } from 'path';
import db from '../models';
import * as dotenv from 'dotenv';
import { rejects } from 'assert';
dotenv.config({ path: './env.example' });

export const putContact = async (data) => {
    return new Promise (async (resolve, rejects) => {
        try {
            await db.Contact.create({
                fullName: data.fullName,
                phoneNumber: data.phoneNumber,
                address: data.address,
                email: data.email,
                note: data.note,
            });
            resolve('Add successfully!');
        } catch (error) {
            rejects(error);
        }
    });
};
