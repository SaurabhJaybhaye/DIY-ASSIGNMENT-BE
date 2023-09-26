// imports
const Menu = require("../models/menuModel");
const asyncHandler = require("express-async-handler");

// get functions

const getAllMenu = asyncHandler(async (req, res) => {
  try {
    const filterType = req.query.filterType;
    if (filterType === "week") {
      let today = new Date();
      let currentDay = today.getDay();
      let firstDayOfWeek = new Date(today);
      firstDayOfWeek.setDate(today.getDate() - currentDay);
      firstDayOfWeek.setHours(0, 0, 0, 0);

      let lastDayOfWeek = new Date(firstDayOfWeek);
      lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
      lastDayOfWeek.setHours(0, 0, 0, 0);

      console.log("firstDayOfWeek", firstDayOfWeek);
      console.log("lastDayOfWeek", lastDayOfWeek);

      const weekMenu = await Menu.find({
        date: { $gte: firstDayOfWeek, $lte: lastDayOfWeek },
      });
      res.json(weekMenu);
    } else {
      const allMenus = await Menu.find({});
      res.status(200).json(allMenus);
      res.json(allMenus);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// post functions
const addMenu = asyncHandler(async (req, res) => {
  try {
    const menus = req.body; // Assuming you're sending an array of menus in the request body

    // Attempt to insert the menus
    const result = await Menu.insertMany(menus);

    // If successful, return the result
    res.json(result);
  } catch (error) {
    // If the error is due to a duplicate key (date), handle it separately
    if (error.code === 11000 && error.keyPattern && error.keyPattern.date) {
      res.status(400).json({
        error: `Menu with date '${error.keyValue.date}' already exists.`,
      });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// put functions
const putMenu = asyncHandler(async (req, res) => {
  const { day, mealType, dishName } = req.body;
  const dateToUpdate = req.params.date;

  try {
    // Find the menu item by date
    const menu = await Menu.findOne({ date: dateToUpdate });

    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    // Update menu properties
    menu.day = day;
    menu.mealType = mealType;
    menu.dishName = dishName;

    await menu.save();
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  getAllMenu,
  addMenu,
  putMenu,
};
