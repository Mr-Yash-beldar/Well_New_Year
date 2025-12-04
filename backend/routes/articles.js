const express = require("express");
const router = express.Router();
const {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getFeaturedArticles,
} = require("../controllers/articleController");
const { protect, authorize } = require("../middleware/auth");
const { validate, schemas } = require("../middleware/validate");

// Public routes
router.get("/", getArticles);
router.get("/featured", getFeaturedArticles);
router.get("/:id", getArticleById);

// Protected routes (Admin/Dietician only)
router.post(
  "/",
  protect,
  authorize("admin", "dietician"),
  validate(schemas.createArticle),
  createArticle
);

router.put("/:id", protect, authorize("admin", "dietician"), updateArticle);

router.delete("/:id", protect, authorize("admin"), deleteArticle);

module.exports = router;
