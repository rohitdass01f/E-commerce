const router = require("express").Router();

const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

// USER
router.post("/", authMiddleware, createOrder);
router.get("/my", authMiddleware, getMyOrders);

// ADMIN
router.get("/admin", authMiddleware, isAdmin, getAllOrders);
router.put("/:id/status", authMiddleware, isAdmin, updateOrderStatus);
router.delete("/:id", authMiddleware, isAdmin, deleteOrder);


module.exports = router;
