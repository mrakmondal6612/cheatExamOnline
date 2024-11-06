const jwt = require('jsonwebtoken')
const User = require('../models/user-model')

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')

    // If you attempt to use an expired token, you'll recived a "401 Unauthorized HTTP" response
    if (!token) {
        return res.status(401).json({message: 'Unauthorized HTTP Access denied. No token provided.'})
    }

    // Assuming token is in the format "Bearer <jwtToken>", Removing the "Bearer prefix"
    // console.log('token from auth middleware', token);

    const jwtToken = token.replace('Bearer', '').trim()

    try {

        const isverified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)

        // console.log('verified data: ', isverified);
        
        const userData = await User.findOne({email: isverified.email}).select({password: 0})
        
        // console.log('userData: ', userData);

        req.user = userData
        req.token = token
        req.userID = userData._id

        next()
    } catch (error) {
        return res.status(401).json({message: 'Unauthorized HTTP Access denied. No token provided.'})
    }

}

module.exports = authMiddleware;