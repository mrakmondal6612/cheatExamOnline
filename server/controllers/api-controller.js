const KeyModel = require('../models/apikey-model')
const PlansModel = require('../models/api-plans-model')
const crypto = require('crypto');
const moment = require('moment')
const User = require('../models/user-model')

const APIKeyForm = async (req, res) => {

    const generateRandomKey =  (days, hours) => {
        const randomString = crypto.randomBytes(8).toString('hex'); // Generates a 16-character random string
        return `${days}_${hours}_${randomString}`;
    }

    try {
        const {email, duration, speed, startDate, coins} = req.body
        const expireAt = moment(startDate).add(duration.days, 'days').add(duration.hours, 'hours').toDate();
        const key = await generateRandomKey(duration.days, duration.hours);
        const userData = await User.findOne({email: email}, {creaditPoints: 1})
        await User.updateOne(
            {email: email},
            {$set: {creaditPoints: userData.creaditPoints - coins}}
        )
        await KeyModel.create({key: key, startDate: startDate, expireAt: expireAt, email: email, speed: speed})
        res.status(200).json({ message: 'API Key Generated successfully'})
    } catch (error) {
        res.status(500).json({ message: 'API Key Not Created'})
    }
}

const getAPIByEmail = async (req, res) => {
    try {
        const {email} = req.body
        const apikeys = await KeyModel.find({email: email})
        res.status(200).json(apikeys)
    } catch (error) {
        res.status(500).json({ message: 'Server Error for fecthing data'})
    }
}

const getAllPlans = async (req, res) => {
    try {
        const plans = await PlansModel.find()
        res.status(200).json(plans)
    } catch (error) {
        res.status(500).json({ message: 'Server Error for fecthing data'})
    }
}

const deleteAPIKey = async (req, res) => {
    try {
        const {email, api_key} = req.body
        resp = await KeyModel.deleteOne({email: email, key: api_key})
        res.status(200).json({message: 'API key deleted successfully !!'})
    } catch (error) {
        res.status(500).json({ message: 'Server Error for fecthing data'})
    }
}

module.exports = {APIKeyForm, getAPIByEmail, getAllPlans, deleteAPIKey};