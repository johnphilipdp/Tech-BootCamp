const webUrlChecker = 'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)'

const mongoose = require('mongoose')

// scheme types properties.
// name - must have a type/required/unique/trim/maxLength
// slug - 
// description - type/required/maxLength
// web - type/match - regex to test if its a valid web url etc...
// phone - type/maxLength
// email - type/match
// address - type/required
// averageRating - type/min/max
// averageCost - type
// photo - type/default - 'no-photo.jpg'
// housing - type 

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxLength: [20, "Characters must be below 20"]
  },
  slug: String,
  description: {
    type: String,
    required: true,
    maxLength: [500, "Characters must be below 500"]
  },
  website: {
    type: String,
    match: [
      webUrlChecker,
      "Must be a valid web url"
    ]
  },
  phone: {
    type: Number,
    maxLength: [12, "Must be below 12 digits"],
  },
  email: {
    type: String,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Must be a valid Email"
    ]
  },
  address: {
    type: String,
    required: true
  },
  location: {
    // GeoJSON POINT
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true,
      index: '2dsphere'
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
  },
  careers: {
    // Array of strings
    type: [String],
    required: true,
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX",
      "Data Science",
      "Business",
      "Other",
    ]
  },
  averageRating: {
    type: Number,
    min: [1, "Rating must be greater than 1"],
    max: [10, "Rating must be less than 11"]
  },
  averageCost: Number,
  photo: {
    type: String,
    default: 'no-image.jpg'
  }
})