const express = require('express')
const router = express.Router()
const APIForm = require('../controllers/api-controller')
const authMiddleware = require('../middlewares/auth-middleware')

router.route('/get_api_key').post(authMiddleware, APIForm.APIKeyForm)
router.route('/get_all_api_by_email').post(authMiddleware, APIForm.getAPIByEmail)

router.route('/get_all_plans').get(authMiddleware, APIForm.getAllPlans)

router.route('/delete/apikey').delete(authMiddleware, APIForm.deleteAPIKey)

module.exports = router;