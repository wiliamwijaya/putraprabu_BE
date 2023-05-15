'use strict'
const { Model } = require('sequelize')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}

    static #encrypt = (password) => bcrypt.hashSync(password, 10)

    static register = ({ username, password, email, role, address, phone }) => {
      const encryptedPassword = this.#encrypt(password)

      return this.create({
        username,
        email,
        password: encryptedPassword,
        role,
        address,
        phone,
      })
    }

    checkPassword = (password) => bcrypt.compareSync(password, this.password)

    generateToken = () => {
      const payload = {
        id: this.id,
        username: this.username,
      }

      const secret = 'This is my secret'
      const token = jwt.sign(payload, secret)

      return token
    }

    static authentication = async ({ username, password }) => {
      try {
        const user = await this.findOne({ where: { username } })
        if (!user) return Promise.reject('User not found!')

        const isPasswordValid = user.checkPassword(password)

        if (!isPasswordValid) return Promise.reject('Wrong password!')

        return Promise.resolve(user)
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      role: DataTypes.INTEGER,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  )
  return User
}
