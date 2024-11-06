const Version = require('../models/app-model')
const DemoModel = require('../models/demos-model')

const getAppversion = async (req, res) => {
    try {
        const app_version = await Version.findOne({version: '1.0.0'})
        res.status(200).json(app_version)
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
}

const getDemoVideos = async(req, res) => {
    try {
        const demos = await DemoModel.find()
        res.status(200).json(demos)
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
}

module.exports = {getAppversion, getDemoVideos};