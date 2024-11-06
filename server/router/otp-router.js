const express = require('express')
const router = express.Router()
const {OtpForm, getOtp} = require('../controllers/otp-controller')

router.route('/send_otp').post(OtpForm)
router.route('/verify_otp').post(getOtp)

module.exports = router;