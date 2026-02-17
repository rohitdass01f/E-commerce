const { createUser, login  } = require("../controllers/userControllers");
const router = require("express").Router();




router.route("/").post(createUser);

router.route("/login").post(login);

module.exports = router;
