const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],

    shippingAddress: {
      fullName: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
    },

    totalAmount: Number,

    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "razorpay", "stripe"],
    },
    
     isDeleted: {
      type: Boolean,
      default: false,
    },

    paymentStatus: {
      type: String,
      default: "pending",
    },

    paymentId: String,

    paidAt: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model("order", orderSchema);
