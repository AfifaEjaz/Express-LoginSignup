require('dotenv').config()
const User = require('./model')
const { connect } = require('mongoose')
const { hash, compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

const signup = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        await connect(process.env.MONGO_URL)
        // console.log("DB Connected")

        const checkExist = await User.exists({ email: email })

        if (checkExist) {
            res.json({
                message: "User already Exist"
            })
        }
        else {
            await User.create({ username, email, password : await hash(password,12) })
            console.log("Success")

            res.status(201).json({
                message: "Done"
            })
        }
    }
    catch (error) {

    }


}

const login = async (req, res) => {
    const login = { email, password } = req.body;

    try {
        await connect(process.env.MONGO_URL)
        // console.log("DB Connected")

        const checkExistUser = await User.findOne({ email: email })

        if (!checkExistUser) {
            res.status(404).json({
                message: "User not found"
            })
        }
        else {
            const decryptPass = await compare(password, checkExistUser.password)
            console.log(decryptPass)

            if(email == checkExistUser.email && decryptPass)
            {

                const token = sign(
                    {
                        username : checkExistUser.username,
                        id : checkExistUser._id,
                        email : checkExistUser.email
                    }
                    ,
                    process.env.JWT_SECRET
                )

                res.status(200).json({
                    message : "Successfully Signed In",
                    token : token

                })
            }
            else {
                res.json({
                    message : "Invalid Credentials"

                })
            }
           
            res.json({
                user : checkExistUser
            })
        }
    } 
    catch (error) {
        
    }
  
}



module.exports = { signup, login}