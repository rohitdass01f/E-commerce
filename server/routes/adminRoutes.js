const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

const { getDashboardStats , getAllUsers } = require("../controllers/admincontroller");

router.get("/dashboard", authMiddleware, isAdmin, getDashboardStats);
router.get("/users", authMiddleware, isAdmin, getAllUsers);

module.exports = router;
