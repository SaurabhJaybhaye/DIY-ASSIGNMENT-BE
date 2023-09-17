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

// Middleware to update lunchCount and breakfastCount
mealSchema.pre("save", function (next) {
  this.lunchCount = this.lunch ? this.lunch.length : 0;
  this.breakfastCount = this.breakfast ? this.breakfast.length : 0;
  next();
});

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
