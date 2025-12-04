const express = require("express");
const router = express.Router();
const {
  createGoal,
  getMyGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
  getGoalStats,
} = require("../controllers/goalController");
const { protect } = require("../middleware/auth");
const { validate, schemas } = require("../middleware/validate");

// All routes are protected
router.use(protect);

router.post("/", validate(schemas.createGoal), createGoal);
router.get("/", getMyGoals);
router.get("/stats", getGoalStats);
router.get("/:id", getGoalById);
router.put("/:id", validate(schemas.updateGoal), updateGoal);
router.delete("/:id", deleteGoal);

module.exports = router;
