import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);



const handleCreateProductService = (data, state) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.idItem || !data.addressItem ||
                !data.nameItem || !data.keyId ||
                !data.buyer || !data.state ||
                !data.price || !data.image) {
                resolve({
                    erCode: 1,
                    message: 'Missing parameter!'
                })
            } else {
                let product = await db.Product.findOne({
                    where: { addressItem: data.addressItem },
                    raw: false
                })
                if (!product) {
                    await db.Product.create({
                        idItem: data.idItem,
                        addressItem: data.addressItem,
                        nameItem: data.nameItem,
                        keyId: data.keyId,
                        buyer: data.buyer,
                        state: data.state,
                        price: data.price,
                        image: data.image,
                    });
                    resolve({
                        errCode: 0,
                        message: `Create product success`
                    });
                } else {
                    product.buyer = data.buyer;
                    product.nameItem = data.nameItem;
                    product.image = data.image;
                    product.state = data.state;
                    await product.save();
                    resolve({
                        errCode: 2,
                        message: `Update product success`
                    });
                }

            }
        } catch (e) {
            reject(e)
        }
    })
}

const handleGetProductByOwnerService = (keyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = '';
            if (!keyId) {
                resolve({
                    erCode: 1,
                    message: 'Missing parameter!'
                })
            } else {
                product = await db.Product.findAll({
                    where: { keyId: keyId }
                })

            }
            if (product && product.image) {
                product.image = new Buffer(product.image, 'base64').toString('binary');
            }
            product.errCode = 0;
            resolve(product)
        } catch (e) {
            reject(e)
        }
    })


};
const handleGetAllProductService = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = '';
            if (limit) {
                product = await db.Product.findAll({
                    limit: +limit,
                    order: [['createdAt', 'DESC']],
                    raw: true,
                    nest: true
                })
            }
            product.map(item => {
                if (item && item.image) {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                }
                return item
            })
            resolve(product)
        } catch (e) {
            reject(e);
        }
    })

};
const handleDeleteAllProductService = (count) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (+count === 0) {
                const product = await db.Product.findAll();
                if (product.length !== 0) {
                    const res = db.Product.destroy({
                        where: {},
                        truncate: true
                    })
                    if (res) {
                        resolve({
                            error: 0,
                            errorMessage: 'delete all products oke'
                        })
                    }
                } else {
                    resolve({
                        error: 2,
                        errorMessage: 'Call success'
                    })
                }

            } else {
                resolve({
                    error: 1,
                    errorMessage: 'Not done'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
};
const handleBuyWithStateProductService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.itemState || !data.addressItem || !data.buyer) {
                resolve({
                    erCode: 2,
                    message: 'Missing parameter!'
                })
            } else {
                let product = await db.Product.findOne({
                    where: { addressItem: data.addressItem },
                    raw: false
                });
                if (product) {
                    if (+product.state === 0) {
                        product.cart = data.keyId;
                    }
                    product.state = data.itemState;
                    product.buyer = data.buyer;
                    await product.save();
                    resolve({
                        errCode: 0,
                        message: `buy product success`
                    });
                } else {
                    resolve({
                        erCode: 3,
                        message: 'Buy with state product error!'
                    })
                }

            }
        } catch (e) {
            reject(e);
        }
    })

};
const handleUpdateProductCartService = (keyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!keyId) {
                resolve({
                    erCode: 2,
                    message: 'Missing parameter!'
                })
            } else {
                let product = await db.Product.findAll({
                    where: { cart: keyId },
                    raw: false
                });
                product.map(item => {
                    if (item && item.image) {
                        item.image = new Buffer(item.image, 'base64').toString('binary');
                    }
                    return item
                })
                resolve({
                    errCode: 0,
                    message: 'Oke',
                    data: product
                })

            }
        } catch (e) {
            reject(e);
        }
    })
}
const handleDeleteProductByIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await db.Product.findOne({ where: { id: id } });
            if (!product) {
                resolve({
                    errCode: 2,
                    message: `The product isn't exist`
                })
            }
            if (product) {
                product.state = 0;
            }
            resolve({
                errCode: 0,
                message: `The product is delete`
            })
        } catch (e) {
            reject(e)
        }
    })
};
module.exports = {
    handleCreateProductService,
    handleGetProductByOwnerService,
    handleGetAllProductService,
    handleDeleteAllProductService,
    handleBuyWithStateProductService,
    handleUpdateProductCartService,
    handleDeleteProductByIdService
}
