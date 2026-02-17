const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/orders");

console.log("RAZORPAY KEY 👉", process.env.RAZORPAY_KEY_ID);


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

exports.createRazorpayOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    console.log("ORDER ID PARAM 👉", orderId);

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(order.totalAmount * 100),
      currency: "INR",
      receipt: `receipt_${orderId}`,
    });

    console.log("RAZORPAY ORDER 👉", razorpayOrder.id);

    res.json({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: "INR",
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.log("RAZORPAY CREATE ERROR 👉", err);
    res.status(500).json({
      message: "Payment order failed",
      error: err.message,
    });
  }
};



exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      orderId,
    } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // ✅ Update order in DB
    await Order.findByIdAndUpdate(orderId, {
      isPaid: true,
      paymentInfo: {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      },
    });

    res.json({
      success: true,
      message: "Payment verified & order updated",
    });
  } catch (err) {
    console.log("VERIFY ERROR 👉", err);
    res.status(500).json({
      success: false,
      message: "Payment verification error",
    });
  }
};

