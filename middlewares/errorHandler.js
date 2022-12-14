const ErrorResponse = require("../utils/ErrorResponse")

const errorHandler = (err, req , res, next) => {
  let error = { ...err }
  
  error.message = err.message

  // Mongoose bad objectID
  if(err.name === 'CastError') {
    const message = `Bootcamp with the ID of ${err.value} is not found.`
    error = new ErrorResponse(message, 404)
  }

  // Mongoose duplicate key
  if(err.code === 11000) {
    const message = "Duplicate Field value entered"
    error = new ErrorResponse(message, 400)
  }

  // Mongoose validation error
  if(err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(error => {
      return error.message
    })
    error = new ErrorResponse(message, 400)
  }

  res.status(error.statusCode || 500).json({
    success: "false",
    error: error.message || "Server Error"
  })
}

module.exports = errorHandler