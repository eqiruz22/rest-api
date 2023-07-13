import nodemailer from 'nodemailer'
const createTransport = () => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.ACCOUNT_EMAIL,
            pass: process.env.ACCOUNT_PASSWORD
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

const sendEmail = async (receipent, name) => {
    const transport = createTransport()
    const mail = {
        from: process.env.ACCOUNT_EMAIL,
        to: receipent,
        subject: 'test email',
        text: `hello ${name} you have pending approval to waiting . 
        click this link to approve http://localhost:3000/waiting-to-approve-divisi`
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