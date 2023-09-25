const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema(
  {
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
  },
  {
    toJSON: { virtuals: true }, // Enable virtual properties in JSON output
  }
);

// Define virtual properties for lunchCount and breakfastCount
mealSchema.virtual("lunchCount").get(function () {
  return this.lunch ? this.lunch.length : 0;
});

mealSchema.virtual("breakfastCount").get(function () {
  return this.breakfast ? this.breakfast.length : 0;
});

mealSchema.virtual("totalCost").get(function () {
  return this.lunchCount * 60 + this.breakfastCount * 20;
});

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
