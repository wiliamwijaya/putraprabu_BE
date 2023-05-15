const { User } = require('../models')

const format = (user) => {
  const { id, username, role } = user

  return {
    id,
    username,
    role,
    token: user.generateToken(),
  }
}

exports.timeout = (req, res) => {
  console.log('Pertama')
  console.log('Kedua')
  setTimeout(() => {
    console.log('Ketiga')
  }, 2000)
  setTimeout(() => {
    console.log('Keempat')
  }, 1000)
  setTimeout(() => {
    console.log('Kelima')
  }, 3000)
}

exports.interval = (req, res) => {
  let count = 0
  const buildInterval = setInterval(() => {
    console.log(`${++count} kali jalan`)
    if (count === 10) clearInterval(buildInterval)
  }, 1000)
}

exports.even = (req, res) => {
  let count = 0
  const buildInterval = setInterval(() => {
    if (count % 2 === 0) console.log(`${count} itu genap`)
    else console.log(`${count} itu ganjil`)
    ++count
    if (count === 21) clearInterval(buildInterval)
  }, 500)
}

exports.login = (req, res) => {
  User.authentication(req.body)
    .then((data) => {
      res.status(200).json({ status: 'Login Success', data: format(data) })
    })
    .catch((err) => {
      res.status(400).json({ status: 'Login Failed', msg: err })
    })
}

exports.register = (req, res) => {
  User.findOne({ where: { username: req.body.username } }).then((result) => {
    if (result) res.status(400).json({ status: 'Username has been registered' })
    else
      User.register(req.body)
        .then((data) => {
          res.json({ status: 'Register Success', data })
        })
        .catch((err) => {
          res.status(500).json({ status: 'Register Failed', msg: err })
        })
  })
}

exports.whoami = (req, res) => {
  const currentUser = req.user
  res.json(currentUser)
}

exports.generateToken = (token) => {
  if (token) {
    const authorization = token.split(' ')[1]
    let decoded = null
    try {
      decoded = jwt.verify(authorization, 'This is secret')
    } catch (e) {
      return decoded
    }
    return decoded.id
  }
  return decoded
}
