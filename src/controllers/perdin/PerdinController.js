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

export default {
    showPerdin,
    createPerdin
}