const express = require('express')
const router = express.Router()
const appVersion = require('../controllers/app-controller')

router.route('/get_app').get(appVersion.getAppversion)

router.route('/get_demos').get(appVersion.getDemoVideos)

module.exports = router;