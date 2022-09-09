// import custm error message from the utils
const ErrorResponse = require("../utils/ErrorResponse");

// import our mongoose model
const Bootcamp = require("../models/Bootcamp");

// @desc [GET] all the bootcamps
// @endpoint /api/v1/bootcamps
// @access PUBLIC
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({
      success: "true",
      total: bootcamps.length,
      data: bootcamps,
    });
  } catch (error) {
    next(error);
  }
};

// @desc [GET] a single bootcamp
// @endpoint /api/v1/bootcamps/:id
// @access PUBLIC
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return new ErrorResponse(
        "Bootcamp with the id of: " + req.params.id + "is not found"
      );
    }
    res.status(200).json({ success: "true", data: bootcamp });
  } catch (error) {
    next(error);
  }
};

// @desc [POST] Add a bootcamp
// @endpoint /api/v1/bootcamps
// @access Needs auth/admin role
exports.addBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: "true",
      data: bootcamp,
    });
  } catch (error) {
    next(error);
  }
};

// @desc [PUT] edit a single bootcamp
// @endpoint /api/v1/bootcamps/:id
// @access Needs auth/admin role
exports.editBootcamp = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

// @desc [DELETE] a single bootcamp
// @endpoint /api/v1/bootcamps/:id
// @access Needs auth/admin role
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return res
        .status(404)
        .json({ success: "false", msg: "Bootcamp not found" });
    }

    res.status(200).json({ success: "true", data: {} });
  } catch (error) {
    next(error);
  }
};
