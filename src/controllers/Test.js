import DivisiModel from "../models/divisi/DivisiModel.js";
import UserModel from "../models/user/UserModel.js";
import nodemailer from 'nodemailer'


const test = async (req, res) => {
    const id = req.body.id
    try {
        const [data] = await UserModel.SelectById(id)
        const name = data[0]['divisi_name']
        const [divisi] = await DivisiModel.SelectDivisiName(name)
        const [datahead] = await UserModel.SelectById(divisi[0]['divisi_head'])

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

        const send = async (mail) => {
            let mailOptions = {
                from: 'no-reply@mkncorp.com',
                to: `${mail}`,
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


        // if (data[0]['divisi_name'] === 'IST' && data[0]['title_name'] === 'Manager') {
        //     send('ahmad.rifa@mkncorp.com')
        //     return res.status(200).json({
        //         result: data,
        //         divisi: divisi,
        //         managerResult: datahead
        //     })
        // }

        // send(datahead[0]['email'])
        // return res.status(200).json({
        //     message: 'success send email berdasarkan divisi head',
        //     result: data,
        //     divisi: divisi,
        //     managerResult: datahead
        // })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'error',
            error: error
        })
    }
}

export default {
    test
}