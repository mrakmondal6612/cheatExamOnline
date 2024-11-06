const express = require('express')
const router = express.Router()
const CoinsForm = require('../controllers/coins-controller')
const authMiddleware = require('../middlewares/auth-middleware')

router.route('/get_all_coins_plans').get(authMiddleware, CoinsForm.getAllCoinsPlans)

router.route('/get_coins').post(authMiddleware, CoinsForm.buyCoins)

module.exports = router;