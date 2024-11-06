const CoinsModel = require('../models/coins-model')
const User = require('../models/user-model')

const getAllCoinsPlans = async (req, res) => {
    try {
        const plans = await CoinsModel.find()
        res.status(200).json(plans)
    } catch (error) {
        res.status(500).json({ message: 'Server Error for fecthing data'})
    }
}

const buyCoins = async (req, res) => {
    const {email, coins} = req.body
    // console.log(email, coins);
    
    try {
        const userData = await User.findOne({email: email}, {creaditPoints: 1})
        
        await User.updateOne(
            {email: email},
            {$set: {creaditPoints: userData.creaditPoints + coins}}
        )
        res.status(200).json({message: "Coins added successfully!!"})
    } catch (error) {
        res.status(500).json({ message: 'Server Error for fecthing data'})
    }
}

module.exports = { getAllCoinsPlans, buyCoins };