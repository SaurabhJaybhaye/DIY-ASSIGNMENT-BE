const express = require("express");
const router = express.Router();
// const validateToken = require("../middleware/validateTokenHandler");
const {
  getAllEmployees,
  postEmployee,
  getEmployee,
} = require("../controller/employeeController");

// Use validateToken middleware before the route handler
router.route("/").get(getAllEmployees).post(postEmployee);
router.route("/:empId").get(getEmployee);

module.exports = router;
