const { verifyAccessToken, verifyRefreshToken } = require('../helpers/jwt')
const jwt =require('jsonwebtoken')

module.exports.validateToken = async (req, res, next) => {
  if (!req.originalUrl.includes('auth')) {
    return next()
  }
  const bearerToken = req.headers.authorization
  if (!bearerToken) {
    return res.status(401).send({
      success: false,
      message: 'No token provided',
    })
  }

  if (!bearerToken.startsWith('Bearer')) {
    return res.status(401).send({
      success: false,
      message: 'Invalid token type',
    })
  }
  const token = bearerToken.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_KEY)
    req.decoded = decoded
    req.accessToken = token
    next()
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    })
  }

}
