const routes = require('express').Router()
const User = require('../models/UserRegister.model')
const { register,login,updateProfile ,deleteAccount,allUser} = require('../bussiness_logic/authentication')


routes.post('/user/register', register)
routes.post('/user/login',login)
routes.post('/auth/user/updateProfile',updateProfile)
routes.post('/auth/user/deleteAccount',deleteAccount)
routes.get('/allUsers',allUser)

routes.get('/user/get',(req,res)=>{
    res.send({"message":"getting"});
})



module.exports = routes
