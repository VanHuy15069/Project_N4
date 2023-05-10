import * as categoryService from '../services/categoryService';

export const getCategory = async (req, res) => {
    try {
        const cate = await categoryService.getCategory();
        res.status(200).json({
            cate: cate,
            err: 0,
            meg: 'getCategory is successful',
        });
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'get failed category' + error,
        });
    }
};

export const addCategory = async (req, res) => {
    try {
        const data = req.body.name;
        if (!data) {
            res.status(400).json({
                err: 1,
                msg: 'category name not found',
            });
        } else {
            const cate = await categoryService.addCategory(data);
            res.status(200).json({
                cate: cate,
                err: 0,
                msg: 'addCategory is successful',
            });
        }
    } catch (error) {
        res.status(500).json({
            err: -1,
            meg: 'add failed category' + error,
        });
    }
};

//nam gioi
export const getCategoryMale = async (req, res) => {
    try {
        const data = await categoryService.getCategoryMale();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({
            err: -1,
            msg: 'getCategoryMale failed' + error,
        });
    }
};
//nu gioi
export const getCategoryFemale = async (req, res) => {
    try {
        const data = await categoryService.getCategoryFemale();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({
            err: -1,
            msg: 'getCategoryFemale failed' + error,
        });
    }
};

//update category
export const updateCategory = async (req, res) => {
    try {
        const data = {
            id: req.params.id,
            name: req.body.name,
        };
        if (!data.id || !data.name) {
            res.status(400).json({
                err: 1,
                msg: 'id or name not found',
            });
        } else {
            const update = await categoryService.updateCategory(data);
            res.status(200).json(update);
        }
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'updating category failed' + error,
        });
    }
};

//delete category
export const deleteCategoryId = async (req, res) => {
    try {
        const data = req.params.id;
        if (!data) {
            res.status(400).json({
                err: 1,
                meg: 'id not found',
            });
        } else {
            const deleteId = await categoryService.deleteCategoryId(data);
            res.status(200).json({
                err: 0,
                deleteId: deleteId,
                msg: 'Category deleted successfully',
            });
        }
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'deleting category failed' + error,
        });
    }
};
