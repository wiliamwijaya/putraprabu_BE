const { User } = require('../models')

exports.getAll = (req, res) => {
  User.findAll().then((data) => {
    res.json({ status: 'Fetch Success', data })
  })
}

exports.getOne = (req, res) => {
  const { username } = req.query

  User.findOne({ where: { username } }).then((data) => {
    console.log(data)
    if (data) res.status(200).json({ status: 'Fetch one Success', data })
    else res.status(404).json({ status: 'Not found' })
  })
}

exports.update = (req, res) => {
  const { id } = req.user
  User.update(req.body, { where: { id } })
    .then((data) => {
      if (data) res.status(200).json({ status: 'Update Success' })
      else res.status(404).json({ status: 'Not found' })
    })
    .catch((err) => {
      res.status(500).json(err)
    })
}

exports.delete = async (req, res) => {
  const { username } = req.query

  User.findOne({ where: { username } }).then((data) => {
    if (data?.username) {
      User.destroy({ where: { username } })
        .then((data) => {
          res.json({ status: 'Delete Success', data })
        })
        .catch((err) => {
          res.status(400).json({ msg: err.message })
        })
    } else {
      res.status(400).json({ msg: 'User not found' })
    }
  })
}
