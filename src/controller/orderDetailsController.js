import *as orderDetailsService from '../services/orderDetailsService';

export const addOrderDetails = async(req,res)=>{
    try {
        const data = {
            userId : req.body.userId,
            fullName : req.body.fullName,
            address : req.body.address,
            phoneNumber : req.body.phoneNumber,
            email : req.body.email,
            note : req.body.note,
            status : req.body.status,
        }
        if(!data.userId || !data.fullName || !data.address || !data.phoneNumber || !data.email || !data.status){
            res.status(400).json({
                err:1,
                msg:'orderDetails lack of information'
            })
        }
        else{
            const orderDetails = await orderDetailsService.addOrderDetails(data);
            res.status(200).json({
                err:0,
                msg:'orderDetails is successfully',
                orderDetails : orderDetails,
            })
        }
    } catch (error) {
        res.status(500).json({
            err:-1,
            msg:'addOrderDetails failed' + error,
        })
    }
}

export const getOrderDetails = async (req,res)=>{
    try {
        const id = req.params.id;
        const data = await orderDetailsService.getOrderDetails(id);
        res.status(200).json({
            err: 0,
            msg : 'orderDetails is successfully',
            data : data,
        })
    } catch (error) {
        res.status(500).json({
            err:-1,
            msg :'orderDetails failed' + error,
        })
    }
}

export const deleteOrderDetail = async (req,res)=>{
    try {
        const id = req.params.id;
        const data = await orderDetailsService.deleteOrderDetail(id);
        res.status(200).json({
            err: 0,
            data: data,
            msg: 'orderDetail deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            err:-1,
            msg : 'orderDetails failed' + error,
        })
    }
}
export const getAllOrderDetails = async (req, res) => {
    try {
        const orders = await orderDetailsService.getAllOrderDetails();
        res.status(200).json({
            orders: orders,
            err: 0,
            meg: 'getAllOrderDetail is successful',
        });
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'get failed detail' + error,
        });
    }
};
export const updateOrderDetails = async (req,res)=>{
    try {
        const data = {
            id : req.params.id,
            status : req.body.status,
        }
        if(!data.status || !data.id){
            res.status(404).json({
                err:1,
                msg:'id or name or deleted not found'
            })
        }
        else{
            const response = await orderDetailsService.updateOrderDetails(data);
            res.status(200).json({
                err:0,
                msg:'update is successfuly',
                response : response,
            })
        }

    } catch (error) {
        res.status(500).json({
            err:-1,
            msg:'updateOrderDetails failed' + error,
        })
    }
}