import * as contactService from '../services/contact';

export const putContact = async (req, res) => {
    let dataA = await contactService.putContact(req.body);
    console.log(dataA);
    return res.status(200).json(dataA);
};

export const getAllFeedBack = async (req, res) => {
    try {
        let feedback = await contactService.getFeedback();
        return res.status(200).json(feedback);
    } catch (err) {
        return res.status(400).json({
            err: -1,
            msg: 'Error from server: ' + err,
        });
    }
};
