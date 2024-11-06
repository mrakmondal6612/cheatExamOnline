const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

const userPassMiddlewware = async (req, res, next) => {

    const {email, password} = req.body

    // console.log(email);
    
    if (!email) {
        return res.status(401).json({message: 'No email found.'})
    }

    try {
        
        let is_user = await User.findOne({email: email}).select()
        // console.log(is_user);

        if(is_user){
            try {
                // hash the password 
                const saltRound = await bcrypt.genSalt(10)
                const hash_password = await bcrypt.hash(password, saltRound)
                await User.updateOne(
                    {email: email},
                    {$set: {password: hash_password}}
                )
                return res.status(200).json({message: 'Password Updated'})
                
            } catch (error) {
                next(error)
            }
        }
        else{
            return res.status(401).json({message: 'Not a valid email'})
        }

        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({message: 'No email found.'})
    }

}

module.exports = userPassMiddlewware;