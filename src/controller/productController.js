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

export const updateProduct = async (req, res) => {};

export const deleteProduct = async (req, res) => {};

// kết nối một với nhiều mối quan hệ Sản phẩm và danh muc
export const getProductCategory = async (req, res) => {
    try {
        const data = await productService.getProductCategory();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({
            err: -1,
            msg: 'getProductCategory failed' + error,
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
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));

        if (mimeType && extname) {
            return cb(null, true);
        }
        cb('Give proper files formate to upload');
    },
}).single('image');
