const slugify = require('slugify')

const mongoose = require("mongoose");

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxLength: [20, "Characters must be below 20"],
  },
  slug: String,
  description: {
    type: String,
    required: true,
    maxLength: [500, "Characters must be below 500"],
  },
  website: String,
  phone: String,
  email: {
    type: String,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Must be a valid Email"],
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    // GeoJSON POINT
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
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
    ],
  },
  averageRating: {
    type: Number,
    min: [1, "Rating must be greater than 1"],
    max: [10, "Rating must be less than 11"],
  },
  averageCost: Number,
  photo: {
    type: String,
    default: "no-image.jpg",
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Do something here..
BootcampSchema.pre('save', function(next) {
  this.slug = slugify(this.name, {
    lower: true
  })

  next()
})

module.exports = mongoose.model("Bootcamp", BootcampSchema);
