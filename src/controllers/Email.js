import nodemailer from 'nodemailer'

const TestEmail = (req, res) => {

    const email = req.body.email

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
            from: '"Notification" no-reply@mkncorp.com',
            to: `${email}`,
            subject: 'Test Email notification',
            text: 'Sukses kirim jam 12.40'
        }

        try {
            let info = await transporter.sendMail(mailOptions)
            console.log(info)
            res.status(201).json({
                message: 'Sukses',
                result: info
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                error
            })
        }
    }

    send()
    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         console.log(error)
    //         res.status(500)
    //             .json({
    //                 message: error
    //             })
    //     } else {
    //         res.status(201)
    //             .json({
    //                 message: 'Sukses',
    //                 value: info
    //             })
    //     }
    // })
}

export default TestEmail