const Product = require("../models/product");

const createProduct = async (req, res) => {
  try {
    const { productName, price, image ,category,sizes,brand,gender} = req.body;
    console.log(productName, price, image,category,sizes,brand);
    if (!productName || !price || !image||!category||!sizes||!brand||!gender) {
      return res.status(400).json({ message: "please fill all the fields" });
    }

    const duplicate = await Product.findOne({ productName });

    if (duplicate) {
      return res.status(400).json({ message: "Duplicate product found" });
    }

    const newproduct = new Product({
      productName,
      price,
      image,
      category,
      sizes,
      brand,
      gender,
    });

    await newproduct.save();

    res.json({ message: "Product has been added" });
  } catch (error) {
    console.error("Error adding product", error);
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};

const getAllproducts = async (req, res) => {
  try {
    const product = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fatch Product" });
  }
};

const getproductbyId = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "failed to fetch product" });
  }
};

const getProductsByBrand = async (req, res) => {
  try {
    const { exclude } = req.query;
    const brand = req.params.brand;

    const query = { brand };

    if (exclude) {
      query._id = { $ne: exclude };
    }

    const products = await Product.find(query);

    res.status(200).json(products);
  } catch (error) {
    console.error("Failed to fetch brand products", error);
    res.status(500).json({ message: "Failed to fetch brand products" });
  }
};


const deleteproduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "failed to delete product" });
  }
};

const productupdate = async (req,res) =>{
  try {
    const {id} = req.params;
    const {productName, price, image ,category,sizes,brand} = req.body;

    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (productName) product.productName = productName;
    if (price) product.price = price;
    if (image) product.image = image;
    if (category) product.category = category;
    if (sizes) product.sizes = sizes;
    if (brand) product.brand = brand;

    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
    
  } catch (error) {
    console.error("Failed to update product",error);
    res.status(500).json({message:"failed to update product"})
  }
}

module.exports = {
  createProduct,
  getAllproducts,
  getproductbyId,
  deleteproduct,
  productupdate,
  getProductsByBrand,
};
