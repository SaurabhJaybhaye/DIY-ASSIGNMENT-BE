const express = require("express");
const router = express.Router();
// const validateToken = require("../middleware/validateTokenHandler");
const {
  getAllEmployees,
  postEmployee,
} = require("../controller/employeeController");

// Use validateToken middleware before the route handler
router.route("/").get(getAllEmployees).post(postEmployee);

module.exports = router;
