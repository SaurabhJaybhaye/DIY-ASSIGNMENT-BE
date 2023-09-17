// imports
const Meal = require("../models/mealModel");
const asyncHandler = require("express-async-handler");

// get functions
const getMeal = asyncHandler(async (req, resp) => {
  const empId = req.params.empId;
  const employee = await Meal.find({ empId });
  resp.json(employee);
});

// post functions
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

// put functions
const putMeal = asyncHandler(async (req, resp) => {
  const empId = req.params.empId;
  const updatedMealData = req.body;
  try {
    const updatedItem = await Meal.findOneAndUpdate(
      { empId },
      updatedMealData,
      {
        new: true,
      }
    );
    if (!updatedItem) {
      return resp.status(404).json({ message: "Data not found" });
    }

    resp.json({ message: `Data with ID ${empId} updated successfully` });
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: "Internal Server Error" });
  }

  const respData = {
    ...updatedItem._doc,
    success: true,
    message: `Meal Updated successfully`,
  };
  return resp.status(201).json(respData);
});

module.exports = {
  getMeal,
  addMeal,
  putMeal,
};
