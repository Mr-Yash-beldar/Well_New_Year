const mongoose = require("mongoose");

/**
 * Goal Schema
 * Represents user wellness goals (weight, water, steps, etc.)
 */
const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: [true, "Goal type is required"],
      enum: ["weight", "water", "steps", "calories", "exercise", "custom"],
    },
    title: {
      type: String,
      trim: true,
    },
    target: {
      type: Number,
      required: [true, "Target value is required"],
    },
    unit: {
      type: String,
      required: [true, "Unit is required"],
      default: "units",
    },
    current: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },
    status: {
      type: String,
      enum: ["active", "completed", "paused", "cancelled"],
      default: "active",
    },
    progressHistory: [
      {
        value: Number,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Calculate progress percentage
goalSchema.virtual("progressPercentage").get(function () {
  if (this.target === 0) return 0;
  return Math.min(Math.round((this.current / this.target) * 100), 100);
});

// Index for efficient queries
goalSchema.index({ user: 1, status: 1 });

// Ensure virtuals are included in JSON
goalSchema.set("toJSON", { virtuals: true });
goalSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Goal", goalSchema);
