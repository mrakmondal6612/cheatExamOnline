const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin-controller')
const authMiddleware = require('../middlewares/auth-middleware')
const adminMiddleware = require('../middlewares/admin-middleware')

router.route('/users').get(authMiddleware, adminMiddleware, adminController.getAllUsers)
router.route('/contacts').get(authMiddleware, adminMiddleware, adminController.getAllContacts)

router.route('/users/:id').get(authMiddleware, adminMiddleware, adminController.getUserById)
router.route('/contacts/:email').get(authMiddleware, adminMiddleware, adminController.getUserByEmail)

router.route('/users/delete/:id').delete(authMiddleware, adminMiddleware, adminController.deleteUserById)
router.route('/contacts/delete/:id').delete(authMiddleware, adminMiddleware, adminController.deleteContactById)

router.route('/users/update/:id').patch(authMiddleware, adminMiddleware, adminController.updateUserById)

router.route('/contacts/reply/:email').post(authMiddleware, adminMiddleware, adminController.sendReplyByEmail)

module.exports = router;