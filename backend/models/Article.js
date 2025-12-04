const mongoose = require("mongoose");

/**
 * Article Schema
 * Represents nutrition articles/content
 */
const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      required: false, // Generated automatically from title via pre-save hook
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      maxlength: [300, "Excerpt cannot exceed 300 characters"],
    },
    body: {
      type: String,
      required: [true, "Body content is required"],
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    author: {
      type: String,
      required: [true, "Author is required"],
      default: "WellNewYear Team",
    },
    coverImageUrl: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800",
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create slug from title before saving
articleSchema.pre("save", function (next) {
  if (this.isModified("title") || this.isNew) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  next();
});

// Text index for search functionality
articleSchema.index({ title: "text", excerpt: "text", body: "text" });

module.exports = mongoose.model("Article", articleSchema);
