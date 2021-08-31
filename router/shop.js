const express = require("express");
const productController = require("../controller/shop");
const categoryController = require("../controller/category");

const router = express.Router();

//All products Routes on Home page
router.get("/", productController.getProducts);

router.delete("/delete/:id", productController.postDeleteProduct);

router.post("/edit/:id", productController.postEditProduct);

//Routes for products
router.get("/products", productController.getProducts);

router.post("/products/add-product", productController.postAddProduct);

router.get("/products/edit/:id", productController.getEditProduct);

router.delete("/products/delete/:id", productController.postDeleteProduct);

router.post("/products/edit/:id", productController.postEditProduct);

//Route for getting Products base on categories
router.get(
  "/products/:id/productsCategories",
  productController.getProductCategories
);

router.post(
  "/products/:id/productsCategories",
  productController.newProductCategories
);

// category Routes
// router.get("/category", categoryController.getCategory);

router.post("/category/add-category", categoryController.postAddCategory);

router.get("/category/categoryItem", categoryController.getCategoryItem);

router.delete("/category/delete/:id", categoryController.postDeleteCategory);

router.get("/category/edit/:id", categoryController.getEditCategory);

router.get(
  "/category/:id/categoryByProducts",
  categoryController.getCategoryByProducts
);

router.post(
  "/category/:id/addProductsByCategory",
  categoryController.postAddProductsByCategory
);

router.post("/category/edit/:id", categoryController.postEditCategory);

module.exports = router;
