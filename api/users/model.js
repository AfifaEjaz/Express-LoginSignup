const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    username : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    joining : {
        type : Date,
        default : Date.now
    }
})

const User = model('user', UserSchema)
module.exports = User