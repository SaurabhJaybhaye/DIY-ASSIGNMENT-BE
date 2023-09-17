// imports
const Meal = require("../models/mealModel");
const asyncHandler = require("express-async-handler");

// get functions
const getMeal = asyncHandler(async (req, resp) => {
  const empId = req.params.empId;
  const employee = await Meal.find({ empId });
  resp.json(employee);
});

const addMeal = asyncHandler(async (req, resp) => {
  const empId = req.params.empId;
  const { lunch, breakfast } = req.body;
  const newMeal = await Meal.create({
    empId,
    lunch,
    breakfast,
  });
  const respData = {
    ...newMeal._doc,
    success: true,
    message: `Meal added successfully`,
  };
  return resp.status(201).json(respData);
});

module.exports = {
  getMeal,
  addMeal,
};
