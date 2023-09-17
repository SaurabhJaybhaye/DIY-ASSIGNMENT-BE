const express = require("express");
const router = express.Router();
// const validateToken = require("../middleware/validateTokenHandler");
const { getMeal, addMeal } = require("../controller/mealController");
// Use validateToken middleware before the route handler
router.route("/:empId").get(getMeal).post(addMeal);
module.exports = router;
