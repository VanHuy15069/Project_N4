import * as userService from '../services/userService';

export const getAllUser = async (req, res) => {
    try {
        const user = await userService.getAllUsers(req.body);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'get all failed users' + error,
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                err: 1,
                msg: 'this id could not be found',
            });
        } else {
            const user = await userService.deleteUser(id);
            return res.status(200).json({
                user: user,
                err: 0,
                msg: 'user deleted successfully',
            });
        }
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'delete failed user' + error,
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        if (!data || !id) {
            return res.status(400).json({
                err: 1,
                msg: 'data not found',
            });
        } else {
            const editUser = await userService.updateUser(data, id);
            return res.status(200).json({
                editUser: editUser,
                err: 0,
                msg: 'data updated successfully',
            });
        }
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'edit failed user' + error,
        });
    }
};
