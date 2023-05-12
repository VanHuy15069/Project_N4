import * as contactService from '../services/contact';

export const putContact = async (req, res) => {
    let dataA = contactService.putContact(req.body);
    console.log(dataA);
    return res.send('SUCCESSED');
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
