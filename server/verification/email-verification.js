const nodemailer = require('nodemailer')
const SERVER_EMAIL = 'noreply.automaticexambot@gmail.com'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${SERVER_EMAIL}`,
      pass: `${process.env.EMAIL_PASS}`
    }
});

const generateOTP = async () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
};

const sendOtpToEmail = (email, otp) => {
  const mailOptions = {
    from: `${SERVER_EMAIL}`,
    to: email,
    subject: 'Your OTP Code',
    text: `Your AutomaticExamBot OTP is : ${otp}`
  };
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.error(error);
      }
      // console.log('Email sent: ' + info.response);
    });
  };

module.exports = {generateOTP, sendOtpToEmail}