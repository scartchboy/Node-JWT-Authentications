require('dotenv').config()
require('./src/utils/database')
const express = require('express')
const bodyParser = require('body-parser')
const routes=require('./src/v1/routes/index')
const {validateToken}=require('./src/middleware/index')
const app = express()


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(validateToken)
app.get('/', (req, res, next) => {
  res.send(' route check server')
})



app.use('/v1', routes)
app.listen(process.env.PORT || 5000, () =>
  console.log('connted to server server'),
)
