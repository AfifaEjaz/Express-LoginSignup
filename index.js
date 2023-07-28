const express = require('express')
const app = express()
require('dotenv').config()
// const mongoose = require('mongoose')
// const port = 3000
const port = process.env.SERVER_PORT


app.use(express.json())
app.use('/api', require('./api/users/Routers'))
// app.use('/api', require('./api/users/Routers'))


// app.get('/', (req, res) => {
//   res.send('Hello afifaaaaaaaaa!aaaaaaa')
// })

// mongoose.connect(process.env.MONGO_URL)
//   .then(() => console.log("DB Connected"))
//   .catch((err) => console.log("Something went wrong"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})