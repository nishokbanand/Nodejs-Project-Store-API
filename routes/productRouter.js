const express = require("express");
const productRouter = express.Router();
const {
  getProducts,
  getProductsStatic,
} = require("../controllers/productControllers");
productRouter.route("/").get(getProducts);
productRouter.route("/static").get(getProductsStatic);

module.exports = productRouter;
