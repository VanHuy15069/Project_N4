import * as orderService from '../services/orderService';

export const getOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await orderService.getOrder(id);
        res.status(200).json({
            data: data,
            err: 0,
            msg: 'getOrder is successful',
        });
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'getOrder error: ' + error,
        });
    }
};

export const addOder = async (req, res) => {
    try {
        const data = {
            id: req.params.id,
            userId: req.body.userId,
            productId: req.body.productId,
            quantity: req.body.quantity,
            priceTotal: req.body.priceTotal,
        };
        if (!data.userId || !data.productId || !data.quantity || !data.priceTotal) {
            res.status(400).json({
                err: 1,
                msg: 'order lack of information',
            });
        } else {
            const order = await orderService.addOrder(data);
            res.status(200).json({
                order: order,
                err: 0,
                msg: 'addOrder is successful',
            });
        }
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'addOder failed' + error,
        });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).json({
                err: 1,
                msg: 'not found id',
            });
        } else {
            const data = await orderService.deleteOrder(id);
            res.status(200).json({
                err: 0,
                msg: 'delete order successfully',
                data: data,
            });
        }
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'deleteOrder failed' + error,
        });
    }
};

export const updateOrder = async (req,res)=>{
    try {
        const data = {
            id : req.params.id,
            quantity : req.body.quantity,
            deleted : req.body.deleted,
        }
        if(!data.quantity || !data.deleted || !data.id){
            res.status(404).json({
                err:1,
                msg:'id or name or deleted not found'
            })
        }
        else{
            const response = await orderService.updateOrder(id);
            res.status(200).json({
                err:0,
                msg:'update is successful',
                response : response,
            })
        }

    } catch (error) {
        res.status(500).json({
            err:-1,
            msg:'updateOrder failed' + error,
        })
    }
}