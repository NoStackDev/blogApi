const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()


const connectDB = () => {
    mongoose.connect(process.env.DBURI, (err) => {
        if (err) { console.log(err) }
        else { console.log('connected to database') }
    })
}

module.exports = { connectDB: connectDB }
