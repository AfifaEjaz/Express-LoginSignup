const express = require('express')
const router = express.Router()

const { signup, login} = require('./Controller')

router.post('/signup', signup)
router.post('/login', login)
// router.get('/getallusers', getAllUsers);

module.exports = router