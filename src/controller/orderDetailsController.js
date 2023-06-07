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
        if(!data.userId || !data.fullName || !data.address || !data.phoneNumber || !data.email || !data.note || !data.status){
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