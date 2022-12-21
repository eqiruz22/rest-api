import UserModel from "../../models/user/UserModel.js"
import bcrypt from 'bcrypt'

const getAll = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0
        const limit = parseInt(req.query.limit) || 5
        const search = req.query.query || ''
        const offset = limit * page
        const [totalRow] = await UserModel.CountRows(search)
        const [rows, fields] = await UserModel.SelectAll(search, offset, limit)
        const totalPage = Math.ceil(totalRow[0]['email'] / limit)
        return res.json({
            message: "Success show all data",
            result: rows,
            page: page,
            limit: limit,
            row: totalRow[0]['email'],
            totalPage: totalPage
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error
        })
    }

}

const countAll = async (req, res) => {
    try {
        const [row, field] = await UserModel.Count()
        res.json(row)
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error
        })
    }
}

const getById = async (req, res) => {
    let id = req.params.id

    try {
        const [rows, fields] = await UserModel.SelectById(id)
        if (rows.length < 1) {
            return res.status(201).json({
                message: 'User not found'
            })
        }
        return res.status(200).json({
            message: 'Show user by id',
            value: rows
        })
    } catch (error) {

    }
}

const createData = async (req, res) => {
    const email = req.body.email
    const name = req.body.name
    const password = await bcrypt.hash(req.body.password, 10)
    const role = req.body.role

    if (!req.body.email) {
        return res.json({
            message: 'email cannot be null'
        })
    }
    if (!req.body.name) {
        return res.json({
            message: 'name cannot be null'
        })
    }
    if (!req.body.password) {
        return res.json({
            message: 'password cannot be null'
        })
    }
    if (req.body.password.length < 5) {
        return res.json({
            message: 'password cannot less than 5 character'
        })
    }
    if (!req.body.role) {
        return res.json({
            message: 'role cannot be null'
        })
    }
    try {
        const data = await UserModel.Insert(email, name, password, role)
        return res.status(201).json({
            message: 'Success create data',
            value: data
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error while insert',
            error: error
        })
    }
}

const updateData = async (req, res) => {
    let id = req.params.id
    const email = req.body.email
    const name = req.body.name
    const role = req.body.role
    if (!req.body.email) {
        return res.json({
            message: 'email cannot be null'
        })
    }
    if (!req.body.role) {
        return res.json({
            message: 'role cannot be null'
        })
    }
    try {
        const [rows, fields] = await UserModel.Update(email, name, role, id)
        return res.status(201).json({
            message: 'Update data success',

        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error while update',
            error: error
        })
    }
}

const deleteData = async (req, res) => {
    let id = req.params.id
    try {
        await UserModel.Delete(id)
        return res.status(201).json({
            message: 'Delete data success',
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error while update',
            error: error
        })
    }
}

export default {
    getAll,
    getById,
    createData,
    updateData,
    deleteData,
    countAll
}