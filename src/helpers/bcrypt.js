const bcrypt = require('bcrypt')

module.exports.encryptPassword = async(password) => {
  try {
    const salt =await  bcrypt.genSalt(10)
    const encryptedPassword = bcrypt.hash(password, salt)
    return encryptedPassword
  } catch (error) {
    console.log(error)
  }
}

module.exports.verifyPassword = async (password, hash) =>
  await bcrypt.compare(password, hash)
