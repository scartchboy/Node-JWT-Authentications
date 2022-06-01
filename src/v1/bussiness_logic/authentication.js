const { response } = require('express')
const User = require('../models/UserRegister.model')
const {
  encryptPassword,
  verifyPassword,
  genereateAccessToken,
  genereateRefreshToken,
} = require('../../helpers/index')

module.exports.register = async (req, res) => {
  let password = req.body.password.toString()
  const hashPassword = await encryptPassword(password)

  try {
    const newUser = User({
      username: req.body.username,
      hashedPassword: hashPassword,
      email: req.body.email,
    })

    const newCreatedUser = await newUser.save()

    const { hashedPassword, ...profile } = newCreatedUser._doc
    res.send({
      status: 'Success',
      message: 'User Created SuccessFully',
      profile,
    })
  } catch (error) {
    res.send({ message: error.message })
  }
}

module.exports.login = async (req, res, next) => {
  const { email, password: userpassword } = req.body

  try {
    const user = await User.findOne({ email: email })
    if (!user) {
      return res.send('user not avalible')
    }

    const isValidPassword = verifyPassword(user.hashedPassword, userpassword)
    if (!isValidPassword) {
      return res.send({ message: password in invalid })
    }
    const accessToken = await genereateAccessToken(user)
    const refreshToken = await genereateRefreshToken(user)

    const { hashedPassword, ...profile } = user._doc

    const tokens = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    }

    return res.status(200).json({ profile, tokens })

    return res.status(500).json({
      message: 'wrong cred',
    })
  } catch (error) {
    console.log(error)
    res.send(error.message)
  }
}

module.exports.updateProfile = async (req, res, next) => {
  const { username, email, designation } = req.body

  try {
    const user = await User.findOneAndUpdate(
      { email: email },
      {
        username: username,
        email: email,
        designation: designation,
      },
    )
      .then((response) => {
        res.status(200).send({
          message: 'profile has been updated',
        })
      })
      .catch((error) => {
        res.status(500).send({
          message: error,
        })
      })  
  } catch (error) {
    console.log(error);
  }
  
}

module.exports.deleteAccount = async (req, res, next) => {
  const email = req.body.email
  const user = await User.findOne({ email: email })
  if (!user) {
    res.send({
      message: 'user not found or already deleted',
    })
  }
  const updatedUser = await User.findOneAndRemove({ email: email })
    .then((response) => {
      res.status(200).send({
        status: 'Suucess',
        message: 'account is deleted successfully',
      })
    })
    .catch((error) => {})
}

module.exports.allUser = async (req, res, next) => {
  const users = await User.find().lean()
  if (!users) {
    res.send({
      message: 'users collection is not found',
    })
  }
  res.status(200).send(users)
}
