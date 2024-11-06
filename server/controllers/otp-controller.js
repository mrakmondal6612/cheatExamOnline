const Otp = require('../models/otp-model')
const {generateOTP, sendOtpToEmail} = require('../verification/email-verification')

const OtpForm = async (req, res) => {
    try {
        const {email} = req.body
        const otp = await generateOTP()
        await Otp.create({email, otp})
        await sendOtpToEmail(email, otp)
        res.status(200).json({ message: 'OTP send successfully'})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'OTP not delivered'})
    }
}

const getOtp = async (req, res) => {
    const { email, otp } = req.body;
    const record = await Otp.findOne({ email, otp });
    // console.log(record);
  
    if (!record) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }
  
    // OTP is valid, proceed with your logic (e.g., mark email as verified)
    res.status(200).json({ message: 'OTP verified successfully' });
  
    // Optionally, remove the OTP record after verification
    await Otp.deleteOne({ email, otp });
}
module.exports = {OtpForm, getOtp};