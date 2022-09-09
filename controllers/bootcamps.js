// import our mongoose model

const Bootcamp = require("../models/Bootcamp");

// @desc [GET] all the bootcamps
// @endpoint /api/v1/bootcamps
// @access PUBLIC
exports.getBootcamps = async (req, res) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({
      status: "success",
      total: bootcamps.length,
      data: bootcamps,
    });
  } catch (error) {
    res.status(400).json({ status: "fail", msg: error });
  }
};

// @desc [GET] a single bootcamp
// @endpoint /api/v1/bootcamps/:id
// @access PUBLIC
exports.getBootcamp = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if(!bootcamp) {
      return res.status(400).json({ status: "fail", msg: "Bootcamp not found"})
    }
    res.status(200).json({ status: "success", data: bootcamp });
  } catch (error) {
    res.status(400).json({ status: "fail", msg: error });
  }
};

// @desc [POST] Add a bootcamp
// @endpoint /api/v1/bootcamps
// @access Needs auth/admin role
exports.addBootcamp = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      status: "success",
      data: bootcamp,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      msg: error,
    });
  }
};

// @desc [PUT] edit a single bootcamp
// @endpoint /api/v1/bootcamps/:id
// @access Needs auth/admin role
exports.editBootcamp = (req, res) => {
  res.status(200).json({
    sucess: true,
    msg: `Bootcamp id: ${req.params.id} was edited`,
  });
};

// @desc [DELETE] a single bootcamp
// @endpoint /api/v1/bootcamps/:id
// @access Needs auth/admin role
exports.deleteBootcamp = (req, res) => {
  res.status(200).json({
    sucess: true,
    msg: `Deleted bootcamp: ${req.params.id}`,
  });
};
