const Article = require("../models/Article");

/**
 * @desc    Get all articles with pagination and filtering
 * @route   GET /api/articles
 * @access  Public
 */
const getArticles = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  // Build query
  let query = { published: true };

  // Search by text
  if (req.query.search) {
    query.$text = { $search: req.query.search };
  }

  // Filter by tag
  if (req.query.tag) {
    query.tags = req.query.tag;
  }

  // Execute query
  const articles = await Article.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select("-body"); // Exclude body for list view

  const total = await Article.countDocuments(query);

  res.status(200).json({
    status: "success",
    results: articles.length,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
    data: articles,
  });
};

/**
 * @desc    Get single article by ID
 * @route   GET /api/articles/:id
 * @access  Public
 */
const getArticleById = async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    return res.status(404).json({
      status: "error",
      message: "Article not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: article,
  });
};

/**
 * @desc    Create new article
 * @route   POST /api/articles
 * @access  Private (Admin/Dietician)
 */
const createArticle = async (req, res) => {
  const article = await Article.create(req.body);

  res.status(201).json({
    status: "success",
    data: article,
  });
};

/**
 * @desc    Update article
 * @route   PUT /api/articles/:id
 * @access  Private (Admin/Dietician)
 */
const updateArticle = async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!article) {
    return res.status(404).json({
      status: "error",
      message: "Article not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: article,
  });
};

/**
 * @desc    Delete article
 * @route   DELETE /api/articles/:id
 * @access  Private (Admin)
 */
const deleteArticle = async (req, res) => {
  const article = await Article.findByIdAndDelete(req.params.id);

  if (!article) {
    return res.status(404).json({
      status: "error",
      message: "Article not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Article deleted successfully",
  });
};

/**
 * @desc    Get featured articles (latest 3)
 * @route   GET /api/articles/featured
 * @access  Public
 */
const getFeaturedArticles = async (req, res) => {
  const articles = await Article.find({ published: true })
    .sort({ createdAt: -1 })
    .limit(3)
    .select("-body");

  res.status(200).json({
    status: "success",
    results: articles.length,
    data: articles,
  });
};

module.exports = {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getFeaturedArticles,
};
