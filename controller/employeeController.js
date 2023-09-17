// imports
const Employee = require("../models/employeeModel");

const asyncHandler = require("express-async-handler");

// get functions
const getAllEmployees = asyncHandler(async (req, resp) => {
  const allEmployees = await Employee.find({}).populate("meal");
  resp.json(allEmployees);
});

const getEmployee = asyncHandler(async (req, resp) => {
  const empId = req.params.empId;
  const employee = await Employee.find({ empId }).populate("meal");
  resp.json(employee);
});

// put employees details
// const putEmployee = asyncHandler(async (req, resp) => {
//   const empId = req.params.empId;
//   const employee = await Employee.find({ empId }).populate("meal");
//   resp.json(employee);
// });

module.exports = {
  getAllEmployees,
  getEmployee,
};
