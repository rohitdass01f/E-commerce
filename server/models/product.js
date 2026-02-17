const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    image: {
      type: [String],
      require: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "unisex"],
      required: true,
    },

    sizes: [
      {
        type: String,
        require: true,
      },
    ],
    brand: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("product", productSchema);
module.exports = Product;
