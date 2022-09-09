const express = require("express");
const router = express.Router();

// use destructuring to get all the controllers
// for each api endpoint

const {
  getBootcamps,
  getBootcamp,
  addBootcamp,
  editBootcamp,
  deleteBootcamp,
} = require("../controllers/bootcamps");

router.route("/").get(getBootcamps).post(addBootcamp);

router.route("/:id").get(getBootcamp).put(editBootcamp).delete(deleteBootcamp);

module.exports = router;
