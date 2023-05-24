var express = require("express");
var router = express.Router();

const authRouter = require("./auth");
const products = require("./products");
const orders = require("./orders");

router.use("/auth", authRouter);
router.use("/products", products);
router.use("/orders", orders);

module.exports = router;
