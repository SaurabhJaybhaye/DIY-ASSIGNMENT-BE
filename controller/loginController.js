const Employee = require("../models/employeeModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ERROR_TITLES } = require("../constants");
const Meal = require("../models/mealModel");
// post login

const loginUser = asyncHandler(async (req, resp) => {
  const { email, password } = req.body;
  // checking for required fields
  if (!email || !password) {
    resp.status(400).json({ error: "All Fields are Mandatory!" });
  }
  // checking if user is register then will compare password with hashPassword
  const user = await Employee.findOne({ email });
  if (user && bcrypt.compare(password, user.password)) {
    // create a accessToken for user where user object pass info or payload which we want or need in token
    // process.env.ACCESS_TOKEN_SECRET is used for embedded information
    // expiresIn is use for setting expire token time
    const name = user.name;
    const id = user._id;
    const accessToken = await jwt.sign(
      {
        user: {
          name: user.name,
          email: user.email,
          empId: user.empId,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      {
        expiresIn: "15m",
      }
    );
    resp.status(200).json({ accessToken, userData: { email, name, id } });
  } else {
    resp.status(400).json({ error: "Email or Password is not Valid" });
  }
});

// logout  user
const logoutUser = asyncHandler(async (req, resp) => {
  const accessToken = req.headers.authorization.split(" ")[1];

  // Add the token to a blacklist or revocation list
  await addToRevocationList(accessToken);

  resp.status(200).json({ message: "Logged out successfully" });
});

// Post employee
const postEmployee = asyncHandler(async (req, resp) => {
  const { name, empId, password, role, email, meal } = req.body;
  const requiredFields = [
    { field: name, errorMessage: ERROR_TITLES.NAME },
    { field: empId, errorMessage: ERROR_TITLES.MANDATORY_EMPID },
    { field: password, errorMessage: ERROR_TITLES.MANDATORY_PASSWORD },
    { field: email, errorMessage: ERROR_TITLES.MANDATORY_EMAIL },
  ];

  for (const { field, errorMessage } of requiredFields) {
    if (!field) {
      resp.status(400).json({ error: errorMessage });
    }
  }

  const oldEmpId = await Employee.findOne({ empId });
  if (oldEmpId) {
    resp.status(400);
    throw new Error(`empId ${empId} already exist`);
  }

  const mealData = new Meal({
    empId,
    lunch: meal.lunch,
    breakfast: meal.breakfast,
  });

  await mealData.save();

  const hashPassword = await bcrypt.hash(password, 10);
  const newEmployee = await Employee.create({
    name,
    empId,
    password: hashPassword,
    role,
    email,
    meal: mealData._id,
  });
  await newEmployee.save();
  const respData = {
    ...newEmployee._doc,
    ...mealData._doc,
    success: true,
    message: `Employee ${name} added successfully`,
  };
  return resp.status(201).json(respData);
});

module.exports = {
  postEmployee,
  loginUser,
  logoutUser,
};
