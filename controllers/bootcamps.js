// @desc [GET] all the bootcamps
// @endpoint /api/v1/bootcamps
// @access PUBLIC
exports.getBootcamps = (req, res) => {
  res.status(200).json({
    success: true,
    msg: 'Showing all bootcamps',
    data: {
      id: 1
    }
  })
}

// @desc [GET] a single bootcamp
// @endpoint /api/v1/bootcamps/:id
// @access PUBLIC
exports.getBootcamp = (req,res) => {
  res.status(200).json({
    success: true,
    msg: `Showing bootcamp: ${req.params.id}`
  })
}

// @desc [POST] Add a bootcamp
// @endpoint /api/v1/bootcamps
// @access Needs auth/admin role
exports.addBootcamp = (req,res) => {
  res.status(200).json({
    sucess: true,
    msg: 'Added a new bootcamp'
  })
}

// @desc [PUT] edit a single bootcamp
// @endpoint /api/v1/bootcamps/:id
// @access Needs auth/admin role
exports.editBootcamp = (req, res) => {
  res.status(200).json({
    sucess: true,
    msg: `Bootcamp id: ${req.params.id} was edited`
  })
}

// @desc [DELETE] a single bootcamp
// @endpoint /api/v1/bootcamps/:id
// @access Needs auth/admin role
exports.deleteBootcamp = (req,res) => {
  res.status(200).json({
    sucess: true,
    msg: `Deleted bootcamp: ${req.params.id}`
  })
}