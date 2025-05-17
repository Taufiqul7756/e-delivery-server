const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

// Get user profile
router.get("/profile", auth, userController.getProfile);

// Update user profile
router.put("/profile", auth, userController.updateProfile);

// Get all users (optional, might require admin privileges)
router.get("/", auth, userController.getAllUsers);

module.exports = router;
