const router = require("express").Router();
const {
  createProduct,
  getAllproducts,
  getproductbyId,
  deleteproduct,
  productupdate,
  getProductsByBrand,
} = require("../controllers/productControllers");

router.route("/").post(createProduct);
router.route("/").get(getAllproducts);
router.route("/brand/:brand").get(getProductsByBrand);
router.route("/:id").get(getproductbyId);
router.route("/:id").delete(deleteproduct);
router.route("/:id").put(productupdate);

module.exports = router;
