const User = require('../models/user-model')
const Contact = require('../models/contact-model')
const sendReplyToUser = require('../email_message/reply')

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, {password: 0})
        // console.log(users);
        
        if(!users || users.length === 0){
            return res.status(404).json({message: 'No Users Found'})
        }

        return res.status(200).json(users)

    } catch (error) {
        next(error)
    }
}

const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find()
        // console.log(contacts);
        
        if(!contacts || contacts.length === 0){
            return res.status(404).json({message: 'No Contacts Found'})
        }

        return res.status(200).json(contacts)

    } catch (error) {
        next(error)
    }
}

const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id
        await User.deleteOne({_id: id})
        res.status(200).json({message: 'User Deleted Successfully'})
    } catch (error) {
        next(error)
    }
}
const deleteContactById = async (req, res) => {
    try {
        const id = req.params.id
        await Contact.deleteOne({_id: id})
        res.status(200).json({message: 'Contact Deleted Successfully'})
    } catch (error) {
        next(error)
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id
        const user_data = await User.findOne({_id: id}, {password: 0})
        res.status(200).json(user_data)
    } catch (error) {
        next(error)
    }
}

const getUserByEmail = async (req, res) => {
    try {
        const email = req.params.email
        const user_data = await Contact.findOne({email: email})
        res.status(200).json(user_data)
    } catch (error) {
        next(error)
    }
}

const updateUserById = async (req, res) => {
    try {
        const id = req.params.id
        const updatedUserData = req.body

        const updatedData = await User.updateOne({_id: id}, {
            $set: updatedUserData
        })

        res.status(200).json(updatedData)
    } catch (error) {
        next(error)
    }
}

const sendReplyByEmail = async (req, res) => {
    try {
        const email = req.params.email
        const replyMessage = req.body

        await sendReplyToUser(email, replyMessage.subject, replyMessage.message)
        return res.status(200).json({message: 'Email send Successfully!'})
    } catch (error) {
        next(error)
    }
}

module.exports = {getAllUsers, getAllContacts, deleteUserById, deleteContactById, getUserById, updateUserById, sendReplyByEmail, getUserByEmail};