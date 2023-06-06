import * as blogService from '../services/blogService';
import multer from 'multer';
import path from 'path';

export const addBlog = async (req, res) => {
    try {
        const { title, contentHTML, contentHTMLMarkdown } = req.body;
        const image = req.file.filename;
        if (!title || !contentHTML || !contentHTMLMarkdown || !image) {
            return res.status(404).json({
                err: 1,
                msg: 'Thieu thong tin',
            });
        } else {
            const blog = await blogService.addBlog(req.body, image);
            return res.status(200).json(blog);
        }
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'ERROR: ' + error,
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

export const getAllBlog = async (req, res) => {
    try {
        const blog = req.body;
        const getAllBlog = await blogService.getAllBlog(blog);
        res.status(200).json(getAllBlog);
    } catch (err) {
        res.status(500).json({
            err: -1,
            msg: 'GET ALL BLOG FAILED' + err,
        });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const data = {
            id: req.params.id,
            image: req.body.image,
        };
        const dp = await blogService.deleteBlog(data);
        res.status(200).json(dp);
    } catch (err) {
        res.status(500).json({
            err: -1,
            msg: 'DELETE FAILED ' + err,
        });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const data = {
            id: req.params.id,
            title: req.body.title,
            contentHTML: req.body.contentHTML,
            contentHTMLMarkdown: req.body.contentHTMLMarkdown,
        };
        console.log(data);
        if (!data.title || !data.contentHTML || !data.contentHTMLMarkdown || !data.id) {
            res.status(404).json({
                err: 1,
                msg: 'Chua nhap du thong tin',
            });
            
        } else {
            const updateID = await blogService.updateBlog(data);
            res.status(200).json({
                err: 0,
                msg: 'UPDATE BLOG SUCCESS',
                updateID: updateID,
            });
        }
    } catch (err) {
        res.status(500).json({
            err: -1,
            msg: 'UPDATE ERROR: ' + err,
        });
    }
};
export const getOneBlog = async (req, res) => {
    try {
        const id = req.params.id;
        if (id === null) {
            res.status(400).json({
                err: 1,
                msg: 'ko tim thay id',
            });
        }
        const response = await blogService.getOneBolg(id);
        res.status(200).json({
            err: 0,
            msg: 'get one blog is successfully',
            response: response,
        });
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'get one blog faild ' + error,
        });
    }
};
