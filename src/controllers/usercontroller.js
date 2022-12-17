const mysql = require('mysql')
const bcrypt = require('bcrypt')
const config = require('../db/config')
const pool = mysql.createPool(config)

pool.on('Error : ', (err) => {
    console.log(err)
})

module.exports = {
    show(req, res) {
        pool.getConnection(function (err, conn) {
            if (err) {
                throw err
            }
            conn.query('select user.id,user.email,user.username,role.name from user join role where user.role = role.id order by user.id desc', (err, result) => {
                if (err) {
                    res.status(500)
                        .send({
                            success: false,
                            message: 'Error while retrieve data',
                            value: err
                        })
                    throw err
                }
                if (result.length < 1) {
                    res.status(200)
                        .send({
                            success: true,
                            message: 'No data for show, Insert data first!',
                            value: null
                        })
                    return
                }
                res.status(200)
                    .send({
                        success: true,
                        message: 'Retrieve all data',
                        value: result
                    })
                return
            })
            conn.release()
        })
    },


    async createUser(req, res) {

        const password = req.body.password
        const hashbc = await bcrypt.hash(password, 10)

        let data = {
            email: req.body.email,
            username: req.body.username,
            role: req.body.role,
            password: hashbc
        }


        pool.getConnection(function (err, conn) {
            if (err) {
                throw err
            }

            if (!req.body.email || !req.body.username || !req.body.role || !req.body.password) {
                res.status(400)
                    .send({
                        success: false,
                        message: 'all fields is required'
                    })
                return
            }

            conn.query('insert into user set ?', [data], function (err, result, fields) {
                if (err) throw err
                res.status(200).
                    send({
                        success: true,
                        message: 'Success create user',
                    })
            })
            conn.release()
        })
    },

    showById(req, res) {
        let id = req.params.id

        pool.getConnection(function (err, conn) {
            if (err) throw err

            conn.query('select * from user where id = ?', [id], function (err, result) {
                if (err) throw err

                if (result.length < 1) {
                    res.status(404)
                        .send({
                            status: true,
                            message: 'User not found'
                        })
                    return
                }
                res.status(200)
                    .send({
                        status: true,
                        message: 'Success retrieve user',
                        value: result
                    })
            })
            conn.release()
        })
    },

    async updatePassword(req, res) {
        let id = req.params.id

        const passwordUpdate = req.body.password
        const salt = 10
        const hashbc = await bcrypt.hash(passwordUpdate, salt)

        const data = {
            password: hashbc
        }

        pool.getConnection(function (err, conn) {
            if (err) throw err

            conn.query('update user set ? where id = ?', [data, id], function (err, result, fields) {
                if (err) throw err

                res.status(201)
                    .send({
                        status: true,
                        message: 'Password success change'
                    })
            })
            conn.release()
        })
    },

    update(req, res) {
        let id = req.params.id

        const data = {
            email: req.body.email,
            username: req.body.username,
            role: req.body.role
        }


        pool.getConnection(function (err, conn) {
            if (err) throw err

            conn.query('update user set ? where id=?', [data, id], function (err, result, fields) {
                if (err) throw err

                res.status(200)
                    .send({
                        status: true,
                        message: 'Success update user',
                    })
            })
            conn.release()
        })
    },

    deleteById(req, res) {
        let id = req.params.id

        pool.getConnection(function (err, conn) {
            if (err) throw err

            conn.query('delete from user where id = ?', [id], function (err, result, fields) {
                if (err) throw err

                res.status(200)
                    .send({
                        status: true,
                        message: 'Success delete user'
                    })
            })
            conn.release()
        })
    }
}