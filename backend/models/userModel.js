const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
     firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//sign up method (static)
userSchema.statics.signup = async function(firstName, lastName, email, password) {

    //check for email and password
    if (!firstName || !lastName || !email || !password){
        throw Error('All fields are required')
    }

    //check for bad name inputs
    if(!validator.isAlpha(firstName) || !validator.isAlpha(lastName)){
        throw Error("Name can not have numbers or special characters");
    }
    
    //validation for email 
    if (!validator.isEmail(email)){
        throw Error ('Email is not valid')
    }
    //validation for password
    if (!validator.isStrongPassword(password)){
        throw Error ('Password must be at least 8 characters long and contain at least one lowercase, uppercase, number, and symbol.')
    }

    //check to make sure email is unique
    const exists = await this.findOne({ email })
    if (exists) {
        throw Error('Email already exists...')
    }

    //otherwise:
    //generating a salt and then hashing the password with the generated salt
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    //creating a document for the database with a hashed password
    const user = await this.create({ firstName, lastName, email, password: hash})

    return user
}

//login method (static)
userSchema.statics.login = async function(email, password){

    //check for email and password
    if (!email || !password){
        throw Error('All fields are required')
    }

    //check if email is correct
    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Invalid Login Credentials - Email')
    }

    //two arguments to compare password entered and the hashed pw in db
    const match = await bcrypt.compare(password, user.password)
    if (!match){
        throw Error('Invalid Login Credentials - Password')
    }

    return user

}

module.exports = mongoose.model('User', userSchema)