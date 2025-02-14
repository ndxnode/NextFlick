const Watchlist = require("../models/Watchlist");

// @desc    Get user's watchlist
// @route   GET /api/watchlist
// @access  Private
exports.getWatchlist = async (req, res) => {
  try {
    let watchlist = await Watchlist.findOne({ userId: req.user.id });
    
    if (!watchlist) {
      watchlist = await Watchlist.create({ userId: req.user.id, items: [] });
    }
    
    res.json(watchlist);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Add item to watchlist
// @route   POST /api/watchlist/items
// @access  Private
exports.addWatchlistItem = async (req, res) => {
  try {
    const { mediaId, mediaType, status = "planning" } = req.body;

    if (!mediaId || !mediaType) {
      return res.status(400).json({ message: "Media ID and type are required" });
    }

    let watchlist = await Watchlist.findOne({ userId: req.user.id });
    
    if (!watchlist) {
      watchlist = await Watchlist.create({ userId: req.user.id, items: [] });
    }

    // Check if item already exists
    const existingItem = watchlist.items.find(item => item.mediaId === mediaId);
    if (existingItem) {
      return res.status(400).json({ message: "Item already in watchlist" });
    }

    watchlist.items.push({
      mediaId,
      mediaType,
      status,
      dateAdded: new Date(),
      dateUpdated: new Date()
    });

    await watchlist.save();
    res.json(watchlist);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update watchlist item
// @route   PATCH /api/watchlist/items/:mediaId
// @access  Private
exports.updateWatchlistItem = async (req, res) => {
  try {
    const { mediaId } = req.params;
    const updates = req.body;

    const watchlist = await Watchlist.findOne({ userId: req.user.id });
    
    if (!watchlist) {
      return res.status(404).json({ message: "Watchlist not found" });
    }

    const itemIndex = watchlist.items.findIndex(item => item.mediaId === mediaId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in watchlist" });
    }

    // Update allowed fields
    const allowedUpdates = ["status", "progress", "rating", "notes"];
    allowedUpdates.forEach(field => {
      if (updates[field] !== undefined) {
        watchlist.items[itemIndex][field] = updates[field];
      }
    });

    watchlist.items[itemIndex].dateUpdated = new Date();
    await watchlist.save();
    
    res.json(watchlist);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Remove item from watchlist
// @route   DELETE /api/watchlist/items/:mediaId
// @access  Private
exports.removeWatchlistItem = async (req, res) => {
  try {
    const { mediaId } = req.params;

    const watchlist = await Watchlist.findOne({ userId: req.user.id });
    
    if (!watchlist) {
      return res.status(404).json({ message: "Watchlist not found" });
    }

    const itemIndex = watchlist.items.findIndex(item => item.mediaId === mediaId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in watchlist" });
    }

    watchlist.items.splice(itemIndex, 1);
    await watchlist.save();
    
    res.json(watchlist);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get watchlist items by status
// @route   GET /api/watchlist/status/:status
// @access  Private
exports.getItemsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    
    const watchlist = await Watchlist.findOne({ userId: req.user.id });
    
    if (!watchlist) {
      return res.json([]);
    }

    const items = watchlist.items.filter(item => item.status === status);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
