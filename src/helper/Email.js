import nodemailer from 'nodemailer'

const createTransport = () => {
    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: 587,
        secure: false,
        auth: {
            user: process.env.ACCOUNT_EMAIL,
            pass: process.env.ACCOUNT_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    })
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error)
        } else {
            console.log('Server ready to send email')
            console.log(success)
        }
    })
    return transporter
}

const sendEmail = async (receipent) => {
    const transport = createTransport()
    const mail = {
        from: process.env.ACCOUNT_EMAIL,
        to: receipent,
        subject: 'test email',
        html: '<b>Sekarang ada from nya dan sudah aman harusnya</b>',
    }
    try {
        const info = await transport.sendMail(mail)
        console.log(info)
    } catch (error) {
        console.log(error)
    }
}

export default {
    sendEmail
}