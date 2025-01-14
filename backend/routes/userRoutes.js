const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

router.get("/profile", auth, userController.getProfile);
router.patch("/profile", auth, userController.updateProfile);
router.post("/change-password", auth, userController.changePassword);
router.post(
  "/profile-picture",
  auth,
  upload.single("image"),
  userController.updateProfilePicture
);

module.exports = router;
