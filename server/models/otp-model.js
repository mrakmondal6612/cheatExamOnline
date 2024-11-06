const {Schema, model} = require('mongoose')

const otpSchema = new Schema({
    email: {type: String, required: true},
    otp: {type: String, required: true},
    createdAt: {type: Date, expires: '10m', default: Date.now},
})

// cretae a model or a Collection 
const Otp = model('Otp', otpSchema)

module.exports = Otp;