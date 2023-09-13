// imports
const Employee = require("../models/employeeModel");
const asyncHandler = require("express-async-handler");
const express = require("express");

// get functions
const getAllEmployees = asyncHandler(async (req, resp) => {
  const allEmployees = await Employee.find({});
  console.log("allEmp", allEmployees);
  resp.json(allEmployees);
});

module.exports = {
  getAllEmployees,
};
