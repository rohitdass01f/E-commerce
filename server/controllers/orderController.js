const Order = require("../models/orders");
const Product = require("../models/product");

const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    if (!shippingAddress || !totalAmount) {
      return res.status(400).json({ message: "Missing fields" });
    }

    let total = 0;

    for (let item of items) {
      const product = await Product.findById(item.product);

      console.log("PRODUCT 👉", product);
      console.log("ITEM 👉", item);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Not enough stock for ${product.name}` });
      }

      const productPrice = Number(product.price.toString().replace(/,/g, ""));

      total += productPrice * item.quantity;
    }

    if (Math.round(total) !== Math.round(totalAmount)) {
      console.log(
        "⚠️ PRICE MISMATCH frontend:",
        totalAmount,
        "backend:",
        total,
      );
    }

    // backend total ko final maan lo
    const finalTotal = total;

    const order = new Order({
      user: req.user._id,
      items,
      shippingAddress,
      totalAmount: finalTotal,
      isDeleted: false, 
    });

    await order.save();

    for (let item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      });
    }

    res.status(201).json({ message: "Order placed", order });
  } catch (err) {
    res.status(500).json({ message: "Order creation failed" });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [
        { isDeleted: false },
        { isDeleted: { $exists: false } },
      ],
    })
      .populate("user", "fullname email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Admin orders fetch failed" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.isDeleted = true;
    await order.save();

    res.json({ message: "Order removed from list" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};



const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowed = ["confirmed", "shipped", "delivered", "cancelled"];

    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.json({ message: "Status updated", order });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
};
