const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth-middleware')
const paymentController = require('../controllers/payment-controller')


// router.route('/get_all_coins_plans').get(authMiddleware, CoinsForm.getAllCoinsPlans)
router.route('/create_order').post(authMiddleware, paymentController.createOrder)
router.route('/verify_payment').post(authMiddleware, paymentController.verifyPayment)

module.exports = router;