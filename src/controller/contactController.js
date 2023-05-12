import * as contactService from '../services/contact';

export const putContact = async (req, res) => {
    let dataA = contactService.putContact(req.body);
    console.log(dataA);
    return res.send('SUCCESSED');
};
