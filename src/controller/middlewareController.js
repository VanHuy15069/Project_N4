import Jwt from 'jsonwebtoken';

export const middlewareController = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            //Bearer doan nay lay token
            const accessToken = token.split(' ')[1];
            //chung nhan nguoi dung
            Jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY, (err, user) => {
                if (err) {
                    res.status(403).json('token is not valid ');
                }
                req.user = user;
                next();
            });
        } else {
            res.status(401).json('you are not authenticated');
        }
    },

    verifyTokenAndAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.admin) {
                next();
            } else {
                res.status(403).json('you are not allowed to delete other');
            }
        });
    },
};
