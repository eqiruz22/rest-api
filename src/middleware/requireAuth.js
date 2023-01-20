import jwt from 'jsonwebtoken'
import UserModel from '../models/user/UserModel.js'

const requireAuth = async (req, res, next) => {

    const { authorization } = req.headers

    if (!authorization) {
        return res.status(403).json({ message: 'Authorization token required' })
    }

    const token = authorization.split(' ')[1]

    try {
        const { id } = jwt.verify(token, process.env.ACCESS_TOKEN)
        req.user = await UserModel.SelectById(id)
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Invalid token'
        })
    }
}

export default requireAuth