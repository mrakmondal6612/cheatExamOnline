// user : ahidulla
// pass : NababDBMakaut21

const mongoose = require('mongoose')

// const URI = 'mongodb+srv://skahidulla:Ahidulla@Nabab#DB21@cluster0.vhhqfin.mongodb.net/exam_db?retryWrites=true&w=majority&appName=Cluster0'
const URI = process.env.MONGODB_URI
// mongoose.connect(URI)

const connectDb = async () => {
    try {
        await mongoose.connect(URI)
        console.log('connection seuccessful to DB');
    } catch (error) {
        console.log(error);
        console.error('database connection failed')
        process.exit(0)
    }
}

module.exports = connectDb;
