const mongoose = require("mongoose");

const watchlistItemSchema = new mongoose.Schema({
  mediaId: {
    type: String,
    required: true,
  },
  mediaType: {
    type: String,
    required: true,
    enum: ["movie", "tv"],
  },
  status: {
    type: String,
    required: true,
    enum: ["planning", "watching", "completed", "dropped"],
    default: "planning",
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: null,
  },
  notes: {
    type: String,
    default: null,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  dateUpdated: {
    type: Date,
    default: Date.now,
  },
});

const watchlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [watchlistItemSchema],
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Update lastUpdated timestamp on items modification
watchlistSchema.pre("save", function (next) {
  if (this.isModified("items")) {
    this.lastUpdated = new Date();
  }
  next();
});

// Add method to get items by status
watchlistSchema.methods.getItemsByStatus = function (status) {
  return this.items.filter((item) => item.status === status);
};

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

module.exports = Watchlist;
