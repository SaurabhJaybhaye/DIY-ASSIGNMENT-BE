const express = require("express");
const router = express.Router();
// const validateToken = require("../middleware/validateTokenHandler");
const {
  getAllEmployees,
  getEmployee,
} = require("../controller/employeeController");
const { postEmployee, loginUser } = require("../controller/loginController");
// Use validateToken middleware before the route handler
router.route("/").get(getAllEmployees).post(postEmployee);
router.route("/login").post(loginUser);
router.route("/:empId").get(getEmployee);
module.exports = router;
