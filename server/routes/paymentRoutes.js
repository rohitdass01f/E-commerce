const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  createRazorpayOrder,verifyPayment,
} = require("../controllers/paymentController");

router.post("/create/:orderId", authMiddleware, createRazorpayOrder);
router.post("/verify", authMiddleware, verifyPayment);


module.exports = router;
