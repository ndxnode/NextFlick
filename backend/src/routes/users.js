const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Get user profile
router.get("/profile", auth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      watchlist: user.watchlist,
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update profile
router.put("/profile", auth, async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = req.user;

    user.username = username;
    user.email = email;
    await user.save();

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
});

// Update password
router.post("/password", auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = req.user;

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Password update error:", error);
    res.status(500).json({ message: "Failed to update password" });
  }
});

// Update profile picture
router.post(
  "/profile-picture",
  auth,
  upload.single("picture"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const user = req.user;
      user.profilePicture = req.file.path;
      await user.save();

      res.json({
        profilePicture: user.profilePicture,
      });
    } catch (error) {
      console.error("Profile picture update error:", error);
      res.status(500).json({ message: "Failed to update profile picture" });
    }
  }
);

// Get user watchlist
router.get("/watchlist", auth, async (req, res) => {
  try {
    const user = req.user;
    const watchlist = user.watchlist || [];

    res.json(watchlist);
  } catch (error) {
    console.error("Watchlist fetch error:", error);
    res.status(500).json({ message: "Failed to fetch watchlist" });
  }
});

module.exports = router;
