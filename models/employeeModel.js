const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  empId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "employee",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
