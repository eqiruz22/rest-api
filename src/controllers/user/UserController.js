import UserModel from "../../models/user/UserModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN, { expiresIn: '3d' })
}

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

const TestEmail = async (req, res) => {
    const search = req.body.email
    try {
        const [row] = await UserModel.SelectEmail(search)
        if (row.length > 0) {
            return res.send({ value: row, message: 'email found' })
        } else {
            return res.send({ message: 'not found' })
        }
    } catch (error) {
        return res.send({
            message: error
        })
    }
}

const countAll = async (req, res) => {
    try {
        const [row] = await UserModel.Count()
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
        const [rows] = await UserModel.SelectById(id)
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
    const title_id = req.body.title_id

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
    if (!req.body.title_id) {
        return res.json({
            message: 'Title cannot be null'
        })
    }
    try {
        const data = await UserModel.Insert(email, name, password, role, title_id)
        const approve = await UserModel.InsertManagerApproval(data[0]['insertId'])
        return res.status(201).json({
            message: 'Success create data',
            value: data[0]['insertId'],
            result: data,
            approveStatus: approve
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
        const [rows] = await UserModel.Update(email, name, role, id)
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

const getManager = async (req, res) => {
    try {
        const [row] = await UserModel.SelectManager()
        return res.status(201)
            .json({
                message: 'Success get role manager',
                result: row
            })
    } catch (error) {
        return res.status(500)
            .json({
                message: 'Error',
                Error: error
            })
    }
}

const Login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    if (!req.body.email) {
        return res.json({
            message: 'field email cannot be null'
        })
    }
    if (!req.body.password) {
        return res.json({
            message: 'field password cannot be null'
        })
    }
    try {
        const [user] = await UserModel.SelectEmail(email)
        if (!user[0]) {
            return res.status(404).json({
                message: 'User not registered'
            })
        }
        const match = await bcrypt.compare(password, user[0]['password'])
        if (!match) {
            return res.status(404).json({
                message: 'Incorrect password'
            })
        }
        const token = createToken(user[0]['id'])
        return res.status(200).json({
            data: user,
            token: token
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: error
        })
    }
}

export default {
    getAll,
    getById,
    createData,
    updateData,
    deleteData,
    countAll,
    TestEmail,
    getManager,
    Login
}