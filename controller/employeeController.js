// imports
const Employee = require("../models/employeeModel");
const asyncHandler = require("express-async-handler");
const express = require("express");
const { ERROR_TITLES } = require("../constants");

// get functions
const getAllEmployees = asyncHandler(async (req, resp) => {
  const allEmployees = await Employee.find({});
  resp.json(allEmployees);
});

const getEmployee = asyncHandler(async (req, resp) => {
  const empId = req.params.empId;
  const employee = await Employee.find({ empId: empId });
  resp.json(employee);
});

// Post functions

const postEmployee = asyncHandler(async (req, resp) => {
  const { name, empId, password, role, email } = req.body;

  const requiredFields = [
    { field: name, errorMessage: ERROR_TITLES.NAME },
    { field: empId, errorMessage: ERROR_TITLES.MANDATORY_EMPID },
    { field: password, errorMessage: ERROR_TITLES.MANDATORY_PASSWORD },
    { field: email, errorMessage: ERROR_TITLES.MANDATORY_EMAIL },
  ];

  for (const { field, errorMessage } of requiredFields) {
    if (!field) {
      resp.status(400);
      throw new Error(errorMessage);
    }
  }
  const oldEmpId = await Employee.findOne({ empId: empId });
  if (oldEmpId) {
    resp.status(400);
    throw new Error(`empId ${empId} already exist`);
  }
  const newEmployee = await Employee.create({
    name,
    empId,
    password,
    role,
    email,
  });
  const respData = {
    ...newEmployee._doc,
    success: true,
    message: `Employee ${name} added successfully`,
  };
  return resp.status(201).json(respData);
});

module.exports = {
  getAllEmployees,
  postEmployee,
  getEmployee,
};
