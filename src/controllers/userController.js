import userServices from '../services/userServices';

const handleLogin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }
    const userData = await userServices.handleUserLogin(email, password)
    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}
const createUserController = async (req, res) => {
    try {
        const message = await userServices.createUserServices(req.body);
        return res.status(200).json(message)
    } catch (e) {
        console.log('create error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
};

const handleGetAllUseController = async (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'missing require parameter',
            user: {}
        })
    }

    const userData = await userServices.getAllUserServices(id)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'oke',
        user: userData ? userData : {}
    })
};

module.exports = {
    createUserController,
    handleGetAllUseController,
    handleLogin
}