import * as productService from '../services/productService';
import multer from 'multer';
import path from 'path';
//create a new product
export const addProduct = async (req, res) => {
    try {
        const { categoryId, title, price, weight, supplier, summary, quantity } = req.body;
        const image = req.file.filename;
        if (!categoryId || !title || !image || !price || !weight || !supplier || !summary || !quantity) {
            return res.status(404).json({
                err: 1,
                msg: 'You have entered missing product information.',
            });
        } else {
            const product = await productService.addProduct(req.body, image);
            return res.status(200).json(product);
        }
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'add failed product' + error,
        });
    }
};

export const getAllProduct = async (req, res) => {
    try {
        const product = req.body;
        const getAllProduct = await productService.getAllProduct(product);
        res.status(200).json(getAllProduct);
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'getAllProduct failed' + error,
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const data = {
            // categoryId, title,image, price, weight, supplier, summary, quantity
            id: req.params.id,
            categoryId: req.body.categoryId,
            title: req.body.title,
            image: req.file.filename,
            price: req.body.price,
            weight: req.body.weight,
            supplier: req.body.supplier,
            summary: req.body.summary,
            quantity: req.body.quantity,
        };
        if (
            !data.categoryId ||
            !data.title ||
            !data.image ||
            !data.price ||
            !data.weight ||
            !data.supplier ||
            !data.summary ||
            !data.quantity
        ) {
            res.status(404).json({
                err: 1,
                msg: 'You have entered missing product information.',
            });
        } else {
            const updateId = await productService.updateProduct(data);
            res.status(200).json({
                err: 0,
                msg: 'Product updated successfully',
                updateId: updateId,
            });
        }
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'updeting product failed' + error,
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const data = {
            id: req.params.id,
            image: req.body.image,
        };
        if (!data.id) {
            res.status(404).json({
                err: 1,
                msg: 'id not found',
            });
        } else {
            const dp = await productService.deleteProduct(data);
            res.status(200).json(dp);
        }
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'deleteProduct failed' + error,
        });
    }
};

// kết nối một với nhiều mối quan hệ Sản phẩm và danh muc
export const getProductDetails = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await productService.getProductDetails(id);
        res.status(200).json({
            err: 0,
            msg: 'get product details successfully',
            data: data,
        });
    } catch (error) {
        res.status(400).json({
            err: -1,
            msg: 'getProductCategory failed' + error,
        });
    }
};
//tìm kiếm tên sản phẩm
export const getTitle = async (req, res) => {
    try {
        const title = await productService.getTitleFilter(req.query);
        res.status(200).json({
            title: title,
            err: 0,
            msg: 'getTitle is successful',
        });
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'getTitle failed' + error,
        });
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '..', '', 'Images'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

export const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|webp/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));

        if (mimeType && extname) {
            return cb(null, true);
        }
        cb('Give proper files formate to upload');
    },
}).single('image');
