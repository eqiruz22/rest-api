import PerdinModel from "../../models/perdin/PerdinModel.js";
import nodemailer from 'nodemailer'


const showPerdin = async (req, res) => {
    try {
        const [data] = await PerdinModel.SelectPerdin()
        res.status(200)
            .json({
                message: 'Show All data',
                result: data
            })
    } catch (error) {
        res.status(500)
            .json({
                message: 'Error',
                result: error
            })
    }
}

const createPerdin = async (req, res) => {
    let { body } = req
    const formatDateStart = (start) => {
        const d = new Date(start)
        let month = '' + (d.getMonth() + 1)
        let day = '' + d.getDate()
        const year = d.getFullYear()

        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day

        return [year, month, day].join('-')
    }
    const formatDateEnd = (end) => {
        const d = new Date(end)
        let month = '' + (d.getMonth() + 1)
        let day = '' + d.getDate()
        const year = d.getFullYear()

        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day

        return [year, month, day].join('-')
    }
    const start = req.body.start_date
    const end = req.body.end_date
    const formatStartDate = formatDateStart(start)
    const formatEndDate = formatDateEnd(end)

    let transporter = nodemailer.createTransport({
        host: 'access.mkncorp.com',
        port: 587,
        secure: false,
        auth: {
            user: 'no-reply@mkncorp.com',
            pass: 'user.100'
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    if (!req.body) {
        return res.json({
            message: 'All field is required'
        })
    }

    const send = async () => {
        let mailOptions = {
            from: 'no-reply@mkncorp.com',
            to: `${req.body.delegate_approval}`,
            subject: 'Test Email notification',
            text: 'Sukses kirim email'
        }
        try {
            let info = await transporter.sendMail(mailOptions)
            console.log(info)
        } catch (error) {
            console.log(error)
        }
    }

    try {
        const data = await PerdinModel.InsertPerdin(body, formatStartDate, formatEndDate)
        send()
        return res.status(201)
            .json({
                message: 'Success create data',
                result: data
            })
    } catch (error) {
        return res.status(500)
            .json({
                message: 'Error',
                result: error
            })
    }
}

const showWaitingToManager = async (req, res) => {
    try {
        const [row] = await PerdinModel.waitingToApproveManager()
        res.status(200)
            .json({
                message: 'Succes to show',
                result: row
            })
    } catch (error) {
        res.status(500)
            .json({
                message: 'Error',
                Error: error
            })
    }
}

const updateApprovedManager = async (req, res) => {
    const id = req.body.id
    const perdin_id = req.body.perdin_id
    const prj_id = req.body.prj_id
    const user_id = req.body.user_id
    const status_id = req.body.status_id

    let transporter = nodemailer.createTransport({
        host: 'access.mkncorp.com',
        port: 587,
        secure: false,
        auth: {
            user: 'no-reply@mkncorp.com',
            pass: 'user.100'
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const send = async () => {
        let mailOptions = {
            from: 'no-reply@mkncorp.com',
            to: `ahmadrifa11620@gmail.com`,
            subject: 'Test Email notification',
            text: 'Sukses kirim email'
        }
        try {
            let info = await transporter.sendMail(mailOptions)
            console.log(info)
        } catch (error) {
            console.log(error)
        }
    }

    try {
        const data1 = await PerdinModel.UpdateApprovalByManager(id)
        const data2 = await PerdinModel.UpdatePerdinStatusByManager(perdin_id)
        const data3 = await PerdinModel.InsertDirectorApproval(perdin_id, prj_id, user_id)
        send()
        res.status(200)
            .json({
                message: 'Update success',
                result: {
                    data1: data1,
                    data2: data2,
                    data3: data3
                }
            })
    } catch (error) {
        res.status(500)
            .json({
                message: 'Error',
                Error: error
            })
    }
}

const showWaitingToDirector = async (req, res) => {
    try {
        const [row] = await PerdinModel.waitingToApproveDirector()
        res.status(200)
            .json({
                message: 'Show waiting',
                result: row
            })
    } catch (error) {
        res.status(500)
            .json({
                message: 'Error',
                Error: error
            })
    }
}

const updateApprovedDirector = async (req, res) => {
    const perdin_id = req.body.perdin_id
    const id = req.body.id
    try {
        const data1 = await PerdinModel.UpdateApprovalByDirector(id)
        const data2 = await PerdinModel.UpdatePerdinStatusByDirector(perdin_id)
        return res.status(201).json({
            message: 'Updated'
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

export default {
    showPerdin,
    createPerdin,
    showWaitingToManager,
    showWaitingToDirector,
    updateApprovedManager,
    updateApprovedDirector
}