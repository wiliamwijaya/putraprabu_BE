const { User } = require("../models");

const format = (user) => {
  const { id, username, role } = user;

  return {
    id,
    username,
    role,
    token: user.generateToken(),
  };
};

exports.login = (req, res) => {
  User.authentication(req.body)
    .then((data) => {
      res.status(200).json({ status: "Login Success", data: format(data) });
    })
    .catch((err) => {
      res.status(400).json({ status: "Login Failed", msg: err });
    });
};

exports.register = (req, res) => {
  User.findOne({ where: { username: req.body.username } }).then((result) => {
    if (result)
      res.status(400).json({ status: "Username has been registered" });
    else
      User.register(req.body)
        .then((data) => {
          res.json({ status: "Register Success", data });
        })
        .catch((err) => {
          res.status(500).json({ status: "Register Failed", msg: err });
        });
  });
};

exports.generateToken = (token) => {
  if (token) {
    const authorization = token.split(" ")[1];
    let decoded = null;
    try {
      decoded = jwt.verify(authorization, "This is secret");
    } catch (e) {
      return decoded;
    }
    return decoded.id;
  }
  return decoded;
};
