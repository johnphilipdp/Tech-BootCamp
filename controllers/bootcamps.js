const asyncHandler = require('../middlewares/async')

// import custm error message from the utils
const ErrorResponse = require("../utils/ErrorResponse");

// import our mongoose model
const Bootcamp = require("../models/Bootcamp");

// @desc [GET] all the bootcamps
// @endpoint /api/v1/bootcamps
// @access PUBLIC
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    // @TODO: Implement advance querying 
    let query;

    // filters the query to insert "$" sign to the query
    let queryString = JSON.stringify(req.query)
    queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => {
      return '$' + match
    })

    query = await Bootcamp.find(JSON.parse(queryString))

    res.status(200).json({
      success: "true",
      total: query.length,
      data: query,
    });
    
});

// @desc [GET] a single bootcamp
// @endpoint /api/v1/bootcamps/:id
// @access PUBLIC
exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return new ErrorResponse(
        "Bootcamp with the id of: " + req.params.id + "is not found"
      );
    }
    res.status(200).json({ success: "true", data: bootcamp });
});

// @desc [POST] Add a bootcamp
// @endpoint /api/v1/bootcamps
// @access Needs auth/admin role
exports.addBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: "true",
      data: bootcamp,
    });
});

// @desc [PUT] edit a single bootcamp
// @endpoint /api/v1/bootcamps/:id
// @access Needs auth/admin role
exports.editBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      return new ErrorResponse(
        "Bootcamp with the id of: " + req.params.id + "is not found"
      );
    }

    res.status(200).json({ success: "true", data: bootcamp });
});

// @desc [DELETE] a single bootcamp
// @endpoint /api/v1/bootcamps/:id
// @access Needs auth/admin role
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return res
        .status(404)
        .json({ success: "false", msg: "Bootcamp not found" });
    }

    res.status(200).json({ success: "true", data: {} });
});
