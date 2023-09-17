const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
    unique: true,
  },
  lunch: {
    type: [Date],
  },
  lunchCount: {
    type: Number,
    default: 0,
  },
  breakfast: {
    type: [Date],
  },
  breakfastCount: {
    type: Number,
    default: 0,
  },
});

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
