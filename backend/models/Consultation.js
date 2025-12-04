const mongoose = require("mongoose");

/**
 * Consultation Schema
 * Represents a consultation booking between user and dietician
 */
const consultationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: [true, "Consultation date is required"],
    },
    type: {
      type: String,
      required: [true, "Consultation type is required"],
      enum: [
        "Initial Consultation",
        "Follow-up",
        "Nutrition Plan Review",
        "Weight Management",
        "Sports Nutrition",
        "Other",
      ],
      default: "Initial Consultation",
    },
    notes: {
      type: String,
      maxlength: [500, "Notes cannot exceed 500 characters"],
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    dietician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
consultationSchema.index({ user: 1, date: -1 });
consultationSchema.index({ status: 1 });

module.exports = mongoose.model("Consultation", consultationSchema);
