// imports
const Employee = require("../models/employeeModel");
const Meal = require("../models/mealModel");

const asyncHandler = require("express-async-handler");
// get functions
const getAllEmployees = asyncHandler(async (req, resp) => {
  const allEmployees = await Employee.find({}).populate("meal");
  resp.json(allEmployees);
});

const getEmployee = asyncHandler(async (req, resp) => {
  const empId = req.params.empId;
  const employee = await Employee.find({ empId: empId });
  resp.json(employee);
});

module.exports = {
  getAllEmployees,
  getEmployee,
};
