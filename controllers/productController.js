const { Product } = require("../models");
const Sequelize = require("sequelize");
const { generateToken } = require("./authController");
const Op = Sequelize.Op;

exports.get = (req, res) => {
  const { searchTerm } = req.query;
  let query = {};
  if (searchTerm) query = { name: { [Op.like]: `%${searchTerm}%` } };
  Product.findAll({
    where: query,
  }).then((result) => {
    res.json({ status: "Fetch Success", result });
  });
};

exports.detail = (req, res) => {
  const { id } = req.params;
  Product.findOne({ where: { id }, include: ["user"] }).then((result) => {
    res.json({ status: "Fetch Success", result });
  });
};

exports.create = (req, res) => {
  const { id } = req.user;
  const payload = {
    ...req.body,
    user_id: id,
  };
  Product.create(payload).then((result) => {
    res.json({ status: "Create Success", result });
  });
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  Product.findOne({ where: { id } }).then((data) => {
    if (data) {
      Product.destroy({ where: { id } })
        .then((data) => {
          res.json({ status: "Delete Success", data });
        })
        .catch((err) => {
          res.status(400).json({ msg: err.message });
        });
    } else {
      res.status(400).json({ msg: "Product not found" });
    }
  });
};
