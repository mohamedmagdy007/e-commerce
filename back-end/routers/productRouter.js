const express = require("express");
const data = require("../data");
const Product = require("../models/productModel");
const productRouter = express.Router();
const asyncHandler = require("express-async-handler");
const { isAuth } = require("../helpers/Token");
const { isAdmin } = require("../helpers/Token");
const upload = require("../helpers/multer");
productRouter.get(
  "/seed",
  asyncHandler(async (req, res) => {
    // await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

productRouter.get("/", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});
productRouter.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "product not Found" });
  }
});
productRouter.post(
  "/",
  isAuth,
  isAdmin,
  async (req, res) => {
    const product = new Product({
      name:req.body.name,
      image: req.body.image,
      price:req.body.price,
      category: req.body.category,
      brand: req.body.brand,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews:req.body.numReviews,
      description: req.body.description,
    });
    const createdProduct = await product.save();
    res.send({ message: "Product Created", product: createdProduct });
  });
productRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
 if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      res.send({ message: 'Product Updated', product: updatedProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  });
  productRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    async (req, res) => {
      const product = await Product.findById(req.params.id);
      if (product) {
        const deleteProduct = await product.remove();
        res.send({ message: 'Product Deleted', product: deleteProduct });
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
    }
  );

module.exports = productRouter;
