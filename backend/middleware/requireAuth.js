const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {

  //first verify if user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  //split authorization string at the space into an array of two elements
  //grab element at position one
  const token = authorization.split(' ')[1]

  try {
    //verify token and grab the id 
    const { _id } = jwt.verify(token, process.env.SECRET)

    //find user in the db and returns just the _id property 
    req.user = await User.findOne({ _id }).select('_id')
    //if success, call on appropriate routes/functions
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireAuth