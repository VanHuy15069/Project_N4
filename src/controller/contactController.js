import * as contactService from '../services/contactService';

export const addContact = async (req, res) => {
    try {
        //fullName,phoneNumber,address,email,note
        const data = {
            fullName: req.body.fullName,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            email: req.body.email,
            note: req.body.note,
        };
        if (!data.fullName || !data.phoneNumber || !data.address || !data.email || !data.note) {
            res.status(400).json({
                err: 1,
                msg: 'Enter missing information',
            });
        } else {
            const contact = await contactService.addContact(data);
            res.status(200).json({
                err: 0,
                msg: 'add contact successfully',
                contact: contact,
            });
        }
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'add contact failed' + error,
        });
    }
};

export const getContact = async (req, res) => {
    try {
        const data = await contactService.getContact();
        res.status(200).json({
            err: 0,
            msg: 'getContact is successful',
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'get contact failed' + error,
        });
    }
};

export const deleteContact = async (req, res) => {
    try {
        const data = req.params.id;
        if (!data) {
            res.status(404).json({
                err: 1,
                msg: 'delete contact ID not found ',
            });
        } else {
            const deleteTact = await contactService.deleteContact(data);
            res.status(200).json({
                err: 0,
                msg: 'contact deleted successfully',
                deleteTact: deleteTact,
            });
        }
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'delete contact failed' + error,
        });
    }
};
