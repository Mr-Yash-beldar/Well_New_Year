const Joi = require("joi");

/**
 * Validation middleware factory
 * @param {Joi.Schema} schema - Joi validation schema
 * @returns {Function} Express middleware
 */
const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));

      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        details: errors,
      });
    }

    // Replace req.body with validated value
    req.body = value;
    next();
  };
};

/**
 * Validation schemas
 */
const schemas = {
  // User registration
  signup: Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name cannot exceed 50 characters",
      "any.required": "Name is required",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters",
      "any.required": "Password is required",
    }),
  }),

  // User login
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  // Create article
  createArticle: Joi.object({
    title: Joi.string().max(200).required(),
    excerpt: Joi.string().max(300).required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
    author: Joi.string().default("WellNewYear Team"),
    coverImageUrl: Joi.string().uri().optional(),
  }),

  // Create consultation
  createConsultation: Joi.object({
    date: Joi.date().iso().greater("now").required().messages({
      "date.greater": "Consultation date must be in the future",
      "any.required": "Consultation date is required",
    }),
    type: Joi.string()
      .valid(
        "Initial Consultation",
        "Follow-up",
        "Nutrition Plan Review",
        "Weight Management",
        "Sports Nutrition",
        "Other"
      )
      .required(),
    notes: Joi.string().max(500).optional(),
  }),

  // Update consultation
  updateConsultation: Joi.object({
    status: Joi.string().valid(
      "pending",
      "confirmed",
      "completed",
      "cancelled"
    ),
    notes: Joi.string().max(500).optional(),
  }),

  // Create goal
  createGoal: Joi.object({
    type: Joi.string()
      .valid("weight", "water", "steps", "calories", "exercise", "custom")
      .required(),
    title: Joi.string().max(100).when("type", {
      is: "custom",
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
    target: Joi.number().positive().required().messages({
      "number.positive": "Target must be a positive number",
      "any.required": "Target is required",
    }),
    unit: Joi.string().required(),
    current: Joi.number().min(0).default(0),
    startDate: Joi.date()
      .iso()
      .default(() => new Date()),
    endDate: Joi.date()
      .iso()
      .greater(Joi.ref("startDate"))
      .required()
      .messages({
        "date.greater": "End date must be after start date",
        "any.required": "End date is required",
      }),
  }),

  // Update goal
  updateGoal: Joi.object({
    current: Joi.number().min(0).optional(),
    target: Joi.number().positive().optional(),
    status: Joi.string()
      .valid("active", "completed", "paused", "cancelled")
      .optional(),
  }),

  // Update profile
  updateProfile: Joi.object({
    name: Joi.string().min(2).max(50).optional(),
    email: Joi.string().email().optional(),
  }),
};

module.exports = { validate, schemas };
