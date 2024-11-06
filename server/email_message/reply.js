const nodemailer = require('nodemailer')
const SERVER_EMAIL = 'noreply.automaticexambot@gmail.com'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${SERVER_EMAIL}`,
      pass: `${process.env.EMAIL_PASS}`
    }
});

const sendReplyToUser = (email, subject, message) => {
    const mailOptions = {
        from: `${SERVER_EMAIL}`,
        to: email,
        subject: subject,
        text: message
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error(error);
        }
        // console.log('Email sent: ' + info.response);
        });
    };

module.exports = sendReplyToUser;