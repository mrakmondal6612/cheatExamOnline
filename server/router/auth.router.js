// *====================
// express.router
// *====================

/*
    In Express.js, express.Router() is a mini Express application without all the server configerations but which the ability to define routes, middleware, and even have its own set of route handlers. It allows you to modularize your routes and middleware to keep your code organized and maintainable.

    https://expressjs.com/en/guide/routing.html
    Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a "mini-app".
 */


const express = require('express')
const router = express.Router()
// const { home, signup} = require('../controllers/auth-controller')
const authcontrollers = require('../controllers/auth-controller')
const validateSchema = require('../validators/auth-validator')
const validate = require('../middlewares/validate-middleware')
const authMiddleware = require('../middlewares/auth-middleware')
const userPassMiddlewware = require('../middlewares/userPassMiddleware')
const changePassMiddlewware = require('../middlewares/changepass-middleware')


// moethod 1 
/* router.get('/', (req, res) => {
    res.status(200).send('This is  Home Page')
}) */

// method 2 this is good
// router.route('/').get((req, res) => {
//     res
//     .status(200)
//     .send('This is  Home Page')
// })
// method 3 using controllers
router.route('/').get(authcontrollers.home)

router.route('/signup').post(validate(validateSchema.signupSchema), authcontrollers.signup)
router.route('/login').post(validate(validateSchema.loginSchema), authcontrollers.login)

router.route('/user').get(authMiddleware, authcontrollers.user)

router.route('/update_password').post(userPassMiddlewware, authcontrollers.updatePass)
router.route('/change_password').post(changePassMiddlewware, authcontrollers.updatePass)

module.exports = router;