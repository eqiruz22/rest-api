import User from "../models/UserModel.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt"


export const getUser = async (req, res) => {
    const page = parseInt(req.query.page) || 0
    const limit = parseInt(req.query.limit) || 10
    const search = req.query.q || ''
    const offset = limit * page
    const totalRow = await User.count({
        where: {
            [Op.or]: [{
                email: {
                    [Op.like]: '%' + search + '%'
                }
            }, {
                username: {
                    [Op.like]: '%' + search + '%'
                }
            }]
        }
    })
    const totalPage = Math.ceil(totalRow / limit)
    const result = await User.findAll({
        where: {
            [Op.or]: [{
                email: {
                    [Op.like]: '%' + search + '%'
                }
            }, {
                username: {
                    [Op.like]: '%' + search + '%'
                }
            }]
        },
        offset: offset,
        limit: limit,
        order: [
            ['id', 'DESC']
        ]
    })
    return res.status(200).json({
        result: result,
        page: page,
        limit: limit,
        totalRow: totalRow,
        totalPage: totalPage
    })

}

export const insertUser = async (req, res) => {
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    const role = req.body.role
    const hash = await bcrypt.hash(password, 10)
    try {
        await User.create({ email: email, username: username, password: hash, role: role })
        return res.status(200).json({
            message: 'Success create user',
            data: req.body
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error while create user',
            Error: error.errors[0].message,
            data: error.errors[0].value + ' << Email already in database'
        })
    }
}

export const getUserById = async (req, res) => {
    let id = req.params.id
    try {
        const response = await User.findOne({
            where: {
                id: id
            }
        })
        if (!response) {
            return res.status(201).json({
                message: 'Data not found'
            })
        }
        return res.status(201).json({
            message: 'Success show data by id',
            data: response
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error while retrieve user by',
            Error: error.message
        })
    }
}

export const updateUser = async (req, res) => {
    let id = req.params.id
    try {
        await User.update({
            email: req.body.email,
            username: req.body.username,
            role: req.body.role
        }, {
            where: {
                id: id
            }
        })
        return res.status(201).json({
            message: "Succes update data",
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error while update data',
            Error: error.message
        })
    }
}

export const updatePassword = async (req, res) => {
    let id = req.params.id
    const password = req.body.password
    const hash = await bcrypt.hash(password, 10)
    try {
        await User.update({
            password: hash
        }, {
            where: {
                id: id
            }
        })
        return res.status(200).json({
            message: 'Update password success'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Failed update password',
            Error: err
        })
    }
}

export const deleteUserById = async (req, res) => {
    let id = req.params.id
    try {
        await User.destroy({
            where: {
                id: id
            }
        })
        return res.status(200).json({
            message: 'Success delete user'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error while delete user'
        })
    }
}