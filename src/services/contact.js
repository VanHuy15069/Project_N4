import db from '../models';
import * as dotenv from 'dotenv';
dotenv.config({ path: './env.example' });

export const putContact = async (data) => {
    new Promise(async (resolve, rejects) => {
        try {
            await db.Contact.create({
                fullName: data.fullName,
                phoneNumber: data.phoneNumber,
                address: data.address,
                email: data.email,
                note: data.note,
            });
            resolve({
                err: 0,
                msg: 'Add successfully',
            });
        } catch (error) {
            rejects(error);
        }
    });
};

export const getFeedback = () => {
    return new Promise(async (resolve, rejects) => {
        try {
            let feedback = await db.Contact.findAll({ raw: true });
            resolve({
                err: 0,
                data: feedback,
            });
        } catch (error) {
            rejects(error);
        }
    });
};
