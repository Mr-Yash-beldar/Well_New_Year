const Consultation = require("../models/Consultation");

/**
 * @desc    Create new consultation
 * @route   POST /api/consultations
 * @access  Private
 */
const createConsultation = async (req, res) => {
  const { date, type, notes } = req.body;

  // Check for existing consultation at the same time (basic conflict detection)
  const existingConsultation = await Consultation.findOne({
    date,
    status: { $in: ["pending", "confirmed"] },
  });

  if (existingConsultation) {
    return res.status(400).json({
      status: "error",
      message: "This time slot is already booked. Please choose another time.",
    });
  }

  const consultation = await Consultation.create({
    user: req.user._id,
    date,
    type,
    notes,
  });

  // Populate user info
  await consultation.populate("user", "name email");

  res.status(201).json({
    status: "success",
    message: "Consultation booked successfully",
    data: consultation,
  });
};

/**
 * @desc    Get all consultations for logged-in user
 * @route   GET /api/consultations
 * @access  Private
 */
const getMyConsultations = async (req, res) => {
  const consultations = await Consultation.find({ user: req.user._id })
    .sort({ date: -1 })
    .populate("user", "name email")
    .populate("dietician", "name email");

  res.status(200).json({
    status: "success",
    results: consultations.length,
    data: consultations,
  });
};

/**
 * @desc    Get all consultations (Admin/Dietician only)
 * @route   GET /api/consultations/all
 * @access  Private (Admin/Dietician)
 */
const getAllConsultations = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  let query = {};

  // Filter by status
  if (req.query.status) {
    query.status = req.query.status;
  }

  const consultations = await Consultation.find(query)
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit)
    .populate("user", "name email")
    .populate("dietician", "name email");

  const total = await Consultation.countDocuments(query);

  res.status(200).json({
    status: "success",
    results: consultations.length,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
    data: consultations,
  });
};

/**
 * @desc    Get single consultation by ID
 * @route   GET /api/consultations/:id
 * @access  Private
 */
const getConsultationById = async (req, res) => {
  const consultation = await Consultation.findById(req.params.id)
    .populate("user", "name email")
    .populate("dietician", "name email");

  if (!consultation) {
    return res.status(404).json({
      status: "error",
      message: "Consultation not found",
    });
  }

  // Check if user owns this consultation or is admin/dietician
  if (
    consultation.user._id.toString() !== req.user._id.toString() &&
    !["admin", "dietician"].includes(req.user.role)
  ) {
    return res.status(403).json({
      status: "error",
      message: "Not authorized to access this consultation",
    });
  }

  res.status(200).json({
    status: "success",
    data: consultation,
  });
};

/**
 * @desc    Update consultation status
 * @route   PUT /api/consultations/:id
 * @access  Private (Admin/Dietician or owner for cancellation)
 */
const updateConsultation = async (req, res) => {
  const consultation = await Consultation.findById(req.params.id);

  if (!consultation) {
    return res.status(404).json({
      status: "error",
      message: "Consultation not found",
    });
  }

  // Users can only cancel their own consultations
  if (
    req.user.role === "user" &&
    consultation.user.toString() !== req.user._id.toString()
  ) {
    return res.status(403).json({
      status: "error",
      message: "Not authorized to update this consultation",
    });
  }

  // Users can only set status to cancelled
  if (
    req.user.role === "user" &&
    req.body.status &&
    req.body.status !== "cancelled"
  ) {
    return res.status(403).json({
      status: "error",
      message: "Users can only cancel consultations",
    });
  }

  // Update fields
  if (req.body.status) consultation.status = req.body.status;
  if (req.body.notes) consultation.notes = req.body.notes;
  if (req.body.dietician && ["admin", "dietician"].includes(req.user.role)) {
    consultation.dietician = req.body.dietician;
  }

  const updatedConsultation = await consultation.save();
  await updatedConsultation.populate("user", "name email");
  await updatedConsultation.populate("dietician", "name email");

  res.status(200).json({
    status: "success",
    data: updatedConsultation,
  });
};

/**
 * @desc    Delete consultation
 * @route   DELETE /api/consultations/:id
 * @access  Private (Admin or owner)
 */
const deleteConsultation = async (req, res) => {
  const consultation = await Consultation.findById(req.params.id);

  if (!consultation) {
    return res.status(404).json({
      status: "error",
      message: "Consultation not found",
    });
  }

  // Check authorization
  if (
    consultation.user.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({
      status: "error",
      message: "Not authorized to delete this consultation",
    });
  }

  await consultation.deleteOne();

  res.status(200).json({
    status: "success",
    message: "Consultation deleted successfully",
  });
};

module.exports = {
  createConsultation,
  getMyConsultations,
  getAllConsultations,
  getConsultationById,
  updateConsultation,
  deleteConsultation,
};
