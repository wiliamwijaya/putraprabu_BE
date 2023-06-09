const router = require("express").Router();
const product = require("../controllers/productController");
const restrict = require("../middleware/restrict");

router.post("/", restrict, product.create);
router.get("/", product.get);
router.get("/:id", product.detail);
router.delete("/:id", restrict, product.delete);

module.exports = router;
