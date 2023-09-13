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
  breakfast: {
    type: [Date],
  },
});

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
