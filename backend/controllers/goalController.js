const Goal = require("../models/Goal");

/**
 * @desc    Create new goal
 * @route   POST /api/goals
 * @access  Private
 */
const createGoal = async (req, res) => {
  const goalData = {
    ...req.body,
    user: req.user._id,
  };

  // Set default title based on type if not provided
  if (!goalData.title) {
    const titleMap = {
      weight: "Weight Goal",
      water: "Daily Water Intake",
      steps: "Daily Steps Goal",
      calories: "Calorie Goal",
      exercise: "Exercise Goal",
      custom: "Custom Goal",
    };
    goalData.title = titleMap[goalData.type] || "Wellness Goal";
  }

  const goal = await Goal.create(goalData);

  res.status(201).json({
    status: "success",
    message: "Goal created successfully",
    data: goal,
  });
};

/**
 * @desc    Get all goals for logged-in user
 * @route   GET /api/goals
 * @access  Private
 */
const getMyGoals = async (req, res) => {
  let query = { user: req.user._id };

  // Filter by status
  if (req.query.status) {
    query.status = req.query.status;
  }

  // Filter by type
  if (req.query.type) {
    query.type = req.query.type;
  }

  const goals = await Goal.find(query).sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    results: goals.length,
    data: goals,
  });
};

/**
 * @desc    Get single goal by ID
 * @route   GET /api/goals/:id
 * @access  Private
 */
const getGoalById = async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    return res.status(404).json({
      status: "error",
      message: "Goal not found",
    });
  }

  // Check if user owns this goal
  if (goal.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      status: "error",
      message: "Not authorized to access this goal",
    });
  }

  res.status(200).json({
    status: "success",
    data: goal,
  });
};

/**
 * @desc    Update goal
 * @route   PUT /api/goals/:id
 * @access  Private
 */
const updateGoal = async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    return res.status(404).json({
      status: "error",
      message: "Goal not found",
    });
  }

  // Check if user owns this goal
  if (goal.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      status: "error",
      message: "Not authorized to update this goal",
    });
  }

  // Update current progress and add to history
  if (req.body.current !== undefined && req.body.current !== goal.current) {
    goal.progressHistory.push({
      value: req.body.current,
      date: new Date(),
    });
    goal.current = req.body.current;

    // Auto-complete goal if target reached
    if (goal.current >= goal.target && goal.status === "active") {
      goal.status = "completed";
    }
  }

  // Update other fields
  if (req.body.target !== undefined) goal.target = req.body.target;
  if (req.body.status) goal.status = req.body.status;

  const updatedGoal = await goal.save();

  res.status(200).json({
    status: "success",
    message: "Goal updated successfully",
    data: updatedGoal,
  });
};

/**
 * @desc    Delete goal
 * @route   DELETE /api/goals/:id
 * @access  Private
 */
const deleteGoal = async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    return res.status(404).json({
      status: "error",
      message: "Goal not found",
    });
  }

  // Check if user owns this goal
  if (goal.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      status: "error",
      message: "Not authorized to delete this goal",
    });
  }

  await goal.deleteOne();

  res.status(200).json({
    status: "success",
    message: "Goal deleted successfully",
  });
};

/**
 * @desc    Get goal statistics for user
 * @route   GET /api/goals/stats
 * @access  Private
 */
const getGoalStats = async (req, res) => {
  const goals = await Goal.find({ user: req.user._id });

  const stats = {
    total: goals.length,
    active: goals.filter((g) => g.status === "active").length,
    completed: goals.filter((g) => g.status === "completed").length,
    paused: goals.filter((g) => g.status === "paused").length,
    byType: {},
  };

  // Count by type
  goals.forEach((goal) => {
    stats.byType[goal.type] = (stats.byType[goal.type] || 0) + 1;
  });

  res.status(200).json({
    status: "success",
    data: stats,
  });
};

module.exports = {
  createGoal,
  getMyGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
  getGoalStats,
};
