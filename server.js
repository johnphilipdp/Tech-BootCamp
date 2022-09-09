const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/database.js')

// middlewares unoirts
const morgan = require('morgan')
const errorHandler = require('./middlewares/errorHandler')

// route imports
const bootcamps = require('./routes/bootcamps')

// load env config
dotenv.config({path: './config/config.env'})

connectDB()

const app = express()

app.use(express.json())

// using middleware to call on the routes
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/v1/bootcamps', bootcamps)
app.use(errorHandler)


const PORT = process.env.PORT



const server = app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} mode, on port: ${PORT}`)
)


process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`)
  server.close(() => {
    process.exit(1)
  })
})