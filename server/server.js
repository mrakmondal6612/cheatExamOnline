require('dotenv').config()
const express = require("express")
const cors = require('cors')
const app = express()
const authRoute = require('./router/auth.router')
const contactRoute = require('./router/contact-router')
const otpRoute = require('./router/otp-router')
const adminRoute = require('./router/admin-router')
const APIRoute = require('./router/api-router')
const CoinsRoute = require('./router/coins-router')
const PaymentRoute = require('./router/payment-router')
const VersionRoute = require('./router/app-router')
const connectDb = require('./utlis/db')
const errorMiddleware = require('./middlewares/error-middleware')

// let's tackle cors
const REQ_URL = 'https://automatic-exam-bot.vercel.app'
// const REQ_URL = 'https://e7da-2409-40e1-1d-e085-5d44-bc22-a559-944c.ngrok-free.app'
const corsOption = {
    origin: REQ_URL,
    methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
    credentials: true,
}
app.use(cors(corsOption))

/*
    app.use(express.json())
    This line of code adds Express middleware that parses incoming request bodies with JSON payloads. It's important to place this before any 
    routes that need to handle JSON data in the request body. This middleware is responsible for parsing JSON data from requests, and it should 
    be applied at the beginning of your middleware stack to ensure it's available for all subsequent route handlers.
*/

app.use(express.json())

/* Define all the routes */

// app.get("/", (req, res) => {
//     // res.send("Hello World")
//     res.status(200).send("Hello World")
//     console.log("Hello World")
// })

// app.get("/login", (req, res) => {
//     // res.send("Hello World")
//     res.status(200).send("Login Page")
//     console.log("Hello World")
// })

/* Define all the routes in better way */
// Mount the Router: To use the router in your main express app, you can 'mount' it at a specific url prefix

app.use("/api/auth", authRoute)
app.use("/api/form", contactRoute)
app.use("/api/otp", otpRoute)

// let's define admin route
app.use('/api/admin', adminRoute)

// define route for api keys
app.use('/api/api_key', APIRoute)

// define route for coins
app.use('/api/coins', CoinsRoute)

// Payment Route
app.use('/api/payments', PaymentRoute)

// App Version route
app.use('/api/versions', VersionRoute)

app.use(errorMiddleware)

const PORT = 8000
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})
