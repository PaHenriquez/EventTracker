const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

//pass id argument to the json web token
const createToken = (_id) => {
   return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

//login user 
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        //using login function in userModel to grab the user
        const user = await User.login(email, password)
        
        //creating the token, user._id is the id of the different user objects in db
        const token = createToken(user._id)

        //send back response status 200 (means ok success)
        //return email and new document created in mongodb
        res.status(200).json({email, token})

    } catch (error){
        //status 400 (means bad request)
        res.status(400).json({error: error.message})
    }

}

//signup user
const signupUser = async (req, res) => {
    //grab the email and password from the request body
    const {email, password} = req.body

    try {
        //using signup function in userModel to grab the user
        const user = await User.signup(email, password)
        
        //creating the token, user._id is the id of the different user objects in db
        const token = createToken(user._id)

        //send back response status 200 (means ok success)
        //return email and new document created in mongodb
        res.status(200).json({email, token})

    } catch (error){
        //status 400 (means bad request)
        res.status(400).json({error: error.message})
    }

}

module.exports = {signupUser, loginUser}