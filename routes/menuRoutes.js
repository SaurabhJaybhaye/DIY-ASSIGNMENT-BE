const express = require("express");
const router = express.Router();
// const validateToken = require("../middleware/validateTokenHandler");

const {
  getAllMenu,
  addMenu,
  putMenu,
} = require("../controller/menuController");

router.route("/").post(addMenu);

router.route("/filter").get(getAllMenu);
router.route("/:date").put(putMenu);

//To get menus for the present week:

// Request: GET /menu/filter?filterType=week
// To get menus for the present month:

// Request: GET /menu/filter?filterType=month
// To get menus for the present year:

// Request: GET /menu/filter?filterType=year
// To get menus for a specific date (e.g., "2023-09-17"):

// Request: GET /menu/filter?filterType=2023-09-17

module.exports = router;
