const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

const changePassMiddlewware = async (req, res, next) => {

    const {email, oldpass, newpass} = req.body

    // console.log(email);
    
    if (!email) {
        return res.status(401).json({message: 'No email found.'})
    }

    try {
        
        let is_user = await User.findOne({email: email}).select({password: 1})
        // console.log(is_user);

        if(is_user){

            valid_user = await is_user.comparePassword(oldpass)
            
            if(valid_user){
                try {
                    // hash the password 
                    const saltRound = await bcrypt.genSalt(10)
                    const hash_password = await bcrypt.hash(newpass, saltRound)
                    await User.updateOne(
                        {email: email},
                        {$set: {password: hash_password}}
                    )
                    new_user = await User.findOne({email: email}).select()

                    if(new_user){
                        res.status(200).json({
                            message: 'Password Updated', 
                            token: await new_user.generateToken(),
                            userId: new_user._id.toString(),
                        })
                    }else{
                        return res.status(501).json({message: 'Some error occured'})
                    }
                    
                } catch (error) {
                    next(error)
                }
            }else{
                return res.status(401).json({message: 'Password is Incorrect'})
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

module.exports = changePassMiddlewware;