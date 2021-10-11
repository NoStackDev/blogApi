const express = require('express')
const morgan = require('morgan')

const dotenv = require('dotenv')

const { connectDB } = require('./db/db')
const authRouter = require('./routes/auth')

dotenv.config()

// port
const PORT = process.env.PORT || 5001

app = express()

// connect to database
connectDB()

// parse request body
app.use(express.urlencoded({ extended: true }))

// json
app.use(express.json())

// logging
app.use(morgan('dev'))

// routes
app.use('/', authRouter)

app.listen(PORT, () => {
    console.log(`server is running on port ${ PORT }`)
})
