// *====================
// Controllers
// *====================

/*
    In an Express.js application, a "controller" refers to a part of your code that is resposible for handling the application's logic. Controllers are typically used to process incoming requests, interact with models (data sources), and send responses back to cliens. 
    They help orgranize your application by separating concerns and following the MVC (Model-View-Controler) design pattern.
*/

const User = require('../models/user-model')
const bcrypt = require('bcryptjs')


// *===============
// Home Logic
// *===============

const home = async (req, res) => {
    try {
        res
        .status(200)
        .send('This is  Home Page')
    } catch (error) {
        console.log(error)
    }
}

// *===============
// Signup Logic
// *===============

const signup = async (req, res) => {
    try {
        // console.log(req.body);
        const {username, email, phone, password} = req.body

        const userExist = await User.findOne({email: email})

        if(userExist){
            return res.status(400).json({message: 'email already exist'})
        }

        // hash the password 
        // const saltRound = 10
        // const hash_password = await bcrypt.hash(password, saltRound)

        const userCreated = await User.create({username, email, phone, password})

        res.status(201).json({
            message: 'Signup Successful', 
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        })
    } catch (error) {
        console.log(error)
        // res.status(500).json({message: 'internal server error'})
        const err = {
            status: 500,
            message: 'internal server error',
            extraDetails: error
        }
        next(err)
    }
} 


// *===============
// Login Logic
// *===============

const login = async (req, res) => {
    try {
        const {email, password} = req.body

        const userExist = await User.findOne({email})

        if(!userExist){
            return res.status(400).json({message: 'Invalid Credentials'})
        }

        // const user = await bcrypt.compare(password, userExist.password)
        const user = await userExist.comparePassword(password)

        if(user){
            res.status(200).json({
                message: 'Login Successful', 
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            })
        }else{
            res.status(401).json({message: 'Invalid email or password'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'internal server error'})
    }
}

// *===============
// to send user data - User Logic
// *===============

const user = async (req, res) => {
    try {
        // res.status(200).json({msg: 'hi user'})

        const userData = req.user
        // console.log(userData);

        return res.status(200).json({userData})
    } catch (error) {
        console.log(`error from the user route ${error}`);
    }
}


// *===============
// to send user data - User Logic
// *===============

const updatePass = async (req, res) => {
    try {
        // userData = req.user
        // message = req.msg 
        // // console.log(userData, message);
        // return res.status(200).json({userData, message})
    } catch (error) {
        console.log(`error from the updatePass route ${error}`);
    }
}


module.exports = { home, signup, login, user, updatePass }