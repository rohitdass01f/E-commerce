const Category = require("../models/category");
const Product = require("../models/product");



const createCategory = async (req, res) => {
  try {
    const { name, parent } = req.body;

    const category = new Category({
      name,
      parent: parent || null,
    });

    await category.save();

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: "Failed to create category" });
  }
};



const getAllCategories = async (req, res) => {
  try {
   const categories = await Category.find();
  res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // 🔥 ObjectId check
    const productExists = await Product.findOne({
      category: categoryId,
    });

    if (productExists) {
      return res.status(400).json({
        message: "Category is not empty. Remove products first.",
      });
    }

    await Category.findByIdAndDelete(categoryId);

    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error("Delete category error:", err);
    res.status(500).json({ message: "Failed to delete category" });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  deleteCategory,
};
