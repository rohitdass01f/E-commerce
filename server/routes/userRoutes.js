const {
  createUser,
  login,
  getProfile,
  updateProfile,
  addAddress,
  updateAddress,
} = require("../controllers/userControllers");
const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

router.route("/").post(createUser);

router.route("/login").post(login);

router.get("/profile", auth, getProfile);

router.put("/profile", auth, updateProfile);

router.post("/address", auth, addAddress);

router.put("/address/:addressId", auth, updateAddress);

module.exports = router;
