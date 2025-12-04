const express = require("express");
const router = express.Router();
const {
  createConsultation,
  getMyConsultations,
  getAllConsultations,
  getConsultationById,
  updateConsultation,
  deleteConsultation,
} = require("../controllers/consultationController");
const { protect, authorize } = require("../middleware/auth");
const { validate, schemas } = require("../middleware/validate");

// Protected routes
router.post(
  "/",
  protect,
  validate(schemas.createConsultation),
  createConsultation
);

router.get("/", protect, getMyConsultations);

router.get(
  "/all",
  protect,
  authorize("admin", "dietician"),
  getAllConsultations
);

router.get("/:id", protect, getConsultationById);

router.put(
  "/:id",
  protect,
  validate(schemas.updateConsultation),
  updateConsultation
);

router.delete("/:id", protect, deleteConsultation);

module.exports = router;
