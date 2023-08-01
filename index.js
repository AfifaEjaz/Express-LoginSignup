const express = require('express')
const app = express()
require('dotenv').config()

const port = process.env.SERVER_PORT

app.use(express.json())
app.use('/api', require('./api/users/Routers'))
app.use('/api', require('./api/brands/Router'))
app.use('/api', require('./api/categories/Router'))
app.use('/api', require('./api/products/Routers'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})