import productServices from '../services/productServices'
const handleCreateProduct = async (req, res) => {
    try {
        const data = req.body;
        const state = req.query.state
        const message = await productServices.handleCreateProductService(data, state);
        return res.status(200).json(message)
    } catch (e) {
        console.log('create error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
const handleGetProductByOwner = async (req, res) => {
    try {
        const keyId = req.query.keyId;
        if (!keyId) {
            return res.status(500).json({
                errCode: 1,
                errMessage: 'missing require parameter',
                data: {}
            })
        }
        const data = await productServices.handleGetProductByOwnerService(keyId);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'oke',
            data: data ? data : []
        })
    } catch (e) {
        console.log('create error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
};
const handleGetAllProduct = async (req, res) => {
    const limit = req.query.limit;
    try {
        const data = await productServices.handleGetAllProductService(limit);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'oke',
            data: data ? data : []
        })
    } catch (e) {
        console.log('get all user error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
};
const handleDeleteProduct = async (req, res) => {
    try {
        const count = req.query.count;
        if (count) {
            const message = await productServices.handleDeleteAllProductService(count);
            return res.status(200).json(message)
        } else {
            return res.status(200).json({
                error: 0,
                errorMessage: 'Missing parameter'
            })
        }
    } catch (e) {
        console.log('delete product user error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
};
const handleBuyWithStateProduct = async (req, res) => {
    try {
        const product = req.body;
        if (product) {
            const message = await productServices.handleBuyWithStateProductService(product);
            return res.status(200).json(message)
        } else {
            return res.status(200).json({
                error: 1,
                errorMessage: 'Missing parameter'
            })
        }
    } catch (e) {
        console.log('buy with state product error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
};
const handleUpdateProductCart = async (req, res) => {
    try {
        const keyId = req.query.keyId;
        if (keyId) {
            const message = await productServices.handleUpdateProductCartService(keyId);
            return res.status(200).json(message)
        } else {
            return res.status(200).json({
                error: 1,
                errorMessage: 'Missing parameter'
            })
        }
    } catch (e) {
        console.log('update product cart error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
const handleDeleteProductById = async (req, res) => {
    try {
        const id = req.query.id;
        if (id) {
            const message = await productServices.handleDeleteProductByIdService(id);
            return res.status(200).json(message)
        } else {
            return res.status(200).json({
                error: 1,
                errorMessage: 'Missing parameter'
            })
        }
    } catch (e) {
        console.log('delete product error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
};
module.exports = {
    handleCreateProduct,
    handleGetProductByOwner,
    handleGetAllProduct,
    handleDeleteProduct,
    handleBuyWithStateProduct,
    handleUpdateProductCart,
    handleDeleteProductById
}