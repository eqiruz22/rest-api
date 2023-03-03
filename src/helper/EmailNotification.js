import nodemailer from 'nodemailer'

const createTransport = () => {
    const transporter = nodemailer.createTransport({
        host: 'xxxxx',
        port: 587,
        secure: false,
        auth: {
            user: 'xxxxxxxx',
            pass: 'xxxxxxxx'
        },
        tls: {
            rejectUnauthorized: false
        }
    })
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error)
        } else {
            console.log(success)
            console.log('Server ready to send email')
        }
    })
    return transporter
}

const sendEmail = async (receipent) => {
    const transport = createTransport()
    const mail = {
        from: 'xxxxxxxxx',
        to: receipent,
        subject: 'Test email notification',
        text: 'For clients with plaintext support only',
        html: '<p>For clients that do not support AMP4EMAIL or amp content is not valid</p>',
        amp: `<!doctype html>
    <html ⚡4email>
      <head>
        <meta charset="utf-8">
        <style amp4email-boilerplate>body{visibility:hidden}</style>
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
      </head>
      <body>
        <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
        <p>GIF (requires "amp-anim" script in header):<br/>
          <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
      </body>
    </html>`
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