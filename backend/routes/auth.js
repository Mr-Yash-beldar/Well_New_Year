const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getMe,
  updateProfile,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const { validate, schemas } = require("../middleware/validate");

// Public routes
router.post("/signup", validate(schemas.signup), signup);
router.post("/login", validate(schemas.login), login);

// Protected routes
router.get("/me", protect, getMe);
router.put("/profile", protect, validate(schemas.updateProfile), updateProfile);

module.exports = router;
