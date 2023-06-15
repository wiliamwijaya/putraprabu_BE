const { Order, Product } = require("../models");
const Op = require("sequelize").Op;

exports.get = (req, res) => {
  Order.findAll({
    where: { status: { [Op.ne]: 3 } },
    include: ["product", "user"],
  }).then((result) => {
    res.json({ status: "Fetch Success", result });
  });
};

exports.detail = (req, res) => {
  const { id } = req.params;
  Order.findOne({ where: { id }, include: ["product", "user"] }).then(
    (result) => {
      res.json({ status: "Fetch Success", result });
    }
  );
};

exports.create = async (req, res) => {
  const id = req.user.id;
  const payload = {
    ...req.body,
    user_id: id,
  };

  Product.findOne({ where: { id: req.body.product_id } })
    .then(async (product) => {
      if (product?.stock >= req.body.amount && product?.stock) {
        await Product.update(
          { stock: product?.stock - req.body.amount },
          { where: { id: product.id } }
        );
        Order.create(payload).then((result) => {
          res.json({ status: "Create Success", result });
        });
      } else {
        res
          .status(400)
          .json({ status: "Create Failed", msg: "Invalid Amount" });
      }
    })
    .catch((err) => {
      res.status(400).json({ status: "Create Failed", error: err });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  Order.update({ status }, { where: { id } }).then((result) => {
    res.json({ status: "Update Success", result });
  });
};

exports.cancel = async (req, res) => {
  const { id } = req.params;

  // get order
  const order = await Order.findOne({ where: { id: id } })
  if (order === null) {
    console.log('order not found for id :', id);
    return
  }

  // get product
  let productId = order.product_id
  console.log("product id:", productId)
  const product = await Product.findOne({ where: { id: productId } })
  if (product === null) {
    console.log('product not found for id :', productId);
    return
  }

  // update product stock
  let newStock = product.stock + order.amount
  console.log("product id:", newStock)
  await product.update({ stock: newStock }, { where: { id: productId } })

  //update order status
  const result = await order.update({ status: 4 }, { where: { id: id } })

  res.json({ status: "Update Success", result });
};

exports.history = (req, res) => {
  const id = req.user.id;

  Order.findAll({
    where: { user_id: id },
    order: [["createdAt", "DESC"]],
    include: ["product", "user"],
  }).then((result) => {
    res.json({ status: "Fetch Success", result });
  });
};

exports.historyadmin = (req, res) => {
  Order.findAll({
    order: [["createdAt", "DESC"]],
    include: ["product"],
  }).then((result) => {
    res.json({ status: "Fetch Success", result });
  });
};
