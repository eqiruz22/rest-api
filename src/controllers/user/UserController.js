import UserModel from "../../models/user/UserModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN, { expiresIn: '1d' })
}

const getAll = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0
        const limit = parseInt(req.query.limit) || 10
        const search = req.query.query || ''
        const offset = limit * page
        const [totalRow] = await UserModel.CountRows(search)
        const [rows, fields] = await UserModel.SelectAll(search, offset, limit)
        const totalPage = Math.ceil(totalRow[0]['email'] / limit)
        return res.status(200).json({
            message: "Success show all data",
            result: rows,
            page: page,
            limit: limit,
            row: totalRow[0]['email'],
            totalPage: totalPage
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Server error",
            error: error
        })
    }

}

const countAll = async (req, res) => {
    try {
        const [row] = await UserModel.Count()
        return res.status(200).json(row)
    } catch (error) {
        console.log(error)
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
                message: 'User not found',
                value: rows
            })
        }

        return res.status(200).json({
            message: 'Show user by id',
            value: rows
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error while fetching user by id',
            error: error
        })
    }
}



const createData = async (req, res) => {
    const email = req.body.email
    const name = req.body.name
    const password = await bcrypt.hash(req.body.password, 10)
    const role = req.body.role
    const title_id = req.body.title_id
    const divisi = req.body.divisi_id

    if (!req.body.email) {
        return res.status(400).json({
            message: 'email cannot be null'
        })
    }
    if (!req.body.name) {
        return res.status(400).json({
            message: 'name cannot be null'
        })
    }
    if (!req.body.password) {
        return res.status(400).json({
            message: 'password cannot be null'
        })
    }
    if (req.body.password.length < 5) {
        return res.status(400).json({
            message: 'password cannot less than 5 character'
        })
    }
    if (!req.body.role) {
        return res.status(400).json({
            message: 'role cannot be null'
        })
    }
    if (!req.body.title_id) {
        return res.status(400).json({
            message: 'Title cannot be null'
        })
    }
    if (!req.body.divisi_id) {
        return res.status(400).json({
            message: 'Divisi cannot be null'
        })
    }
    try {
        const data = await UserModel.Insert(email, name, password, role, title_id, divisi)
        return res.status(201).json({
            message: 'Success create data',
            result: data,
        })
    } catch (error) {
        console.log(error)
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
    const title_id = req.body.title_id
    const password = req.body.password
    const hash = await bcrypt.hash(password, 10)
    const divisi = req.body.divisi_id
    if (!req.body.email) {
        return res.status(400).json({
            message: 'email cannot be null'
        })
    }
    if (!req.body.role) {
        return res.status(400).json({
            message: 'role cannot be null'
        })
    }

    if (req.body.has_role === 1) {
        if (!req.body.password) {
            try {
                const [rows] = await UserModel.Update(email, name, role, title_id, divisi, id)
                return res.status(201).json({
                    message: 'Update data success',
                })
            } catch (error) {
                console.log(error)
                return res.status(500).json({
                    message: 'Error while update',
                    error: error
                })
            }
        } else {
            try {
                const [data] = await UserModel.UpdateWithPassword(email, name, role, title_id, divisi, hash, id)
                return res.status(201).json({
                    message: 'Update data with password success'
                })
            } catch (error) {
                console.log(error)
                return res.status(500).json({
                    message: 'Error while update with password',
                    message: error
                })
            }
        }
    } else {
        if (!req.body.password) {
            try {
                const [rows] = await UserModel.UpdateForUser(email, name, id)
                return res.status(201).json({
                    message: 'Update data success'
                })
            } catch (error) {
                console.log(error)
                return res.status(500).json({
                    message: 'Error while update data user'
                })
            }
        } else {
            try {
                const [data] = await UserModel.UpdateForUserWithPassword(email, name, hash, id)
                return res.status(201).json({
                    message: 'Update data with password'
                })
            } catch (error) {
                console.log(error)
                return res.status(500).json({
                    message: 'Error while update data user'
                })
            }
        }
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
        console.log(error)
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
        console.log(error)
        return res.status(500)
            .json({
                message: 'Error',
                Error: error
            })
    }
}

const Login = async (req, res) => {
    const email = req.body.email
    const passwd = req.body.password
    if (!req.body.email) {
        return res.status(400).json({
            message: 'field email cannot be null'
        })
    }
    if (!req.body.password) {
        return res.status(400).json({
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
        const withoutPassword = user.map(item => {
            const { password, ...withoutPassword } = item
            return withoutPassword
        })
        const match = await bcrypt.compare(passwd, user[0]['password'])
        if (!match) {
            return res.status(404).json({
                message: 'Incorrect email & password'
            })
        }
        const token = createToken(user[0]['id'])
        return res.status(200).json({
            ...withoutPassword[0],
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: error
        })
    }
}

const showUserWithTitle = async (req, res) => {
    try {
        const [row] = await UserModel.SelectUserAndTitle()
        return res.status(200).json({ result: row })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error })
    }
}

const showUserWithTitleById = async (req, res) => {
    let id = req.params.id
    try {
        const [data] = await UserModel.SelectUserTitleById(id)
        if (data.length < 1) {
            return res.status(404)
                .json({ message: 'Not found' })
        }
        return res.status(200).json({ ...data[0] })
    } catch (error) {
        console.log(error)
        return res.status(500)
            .json({
                message: error
            })
    }
}

const getName = async (req, res) => {
    try {
        const [row] = await UserModel.SelectName()
        return res.status(200).json({
            message: 'Show all name',
            result: row
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error while fetching name',
            error: error
        })
    }
}

export default {
    getAll,
    getById,
    getName,
    createData,
    updateData,
    deleteData,
    countAll,
    getManager,
    Login,
    showUserWithTitle,
    showUserWithTitleById
}