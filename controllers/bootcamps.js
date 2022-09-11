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

    const reqQuery = {...req.query}

    // exlude this params 
    const excludedFields = ['select', 'sort']

    excludedFields.forEach(field => delete reqQuery[field])

    // filters the query to insert "$" sign to the query
    let queryString = JSON.stringify(reqQuery)
    queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => {
      return '$' + match
    })

    query = Bootcamp.find(JSON.parse(queryString))

    // Select function
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ')
      query = query.select(fields)
    }

    // Sort function
    if(req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ')
      query = query.sort(sortBy)
    } else {
      query = query.sort('-createdAt')
    }

    const bootcamps = await query

    res.status(200).json({
      success: "true",
      total: bootcamps.length,
      data: bootcamps,
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
