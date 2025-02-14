const express = require("express");
const router = express.Router();
const watchlistController = require("../controllers/watchlistController");
const auth = require("../middleware/auth");

// Get user's watchlist
router.get("/", auth, watchlistController.getWatchlist);

// Add item to watchlist
router.post("/items", auth, watchlistController.addWatchlistItem);

// Update watchlist item
router.patch("/items/:mediaId", auth, watchlistController.updateWatchlistItem);

// Remove item from watchlist
router.delete("/items/:mediaId", auth, watchlistController.removeWatchlistItem);

// Get watchlist items by status
router.get("/status/:status", auth, watchlistController.getItemsByStatus);

module.exports = router;
