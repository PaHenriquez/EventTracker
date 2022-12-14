const Event = require('../models/eventModel')
const mongoose = require('mongoose')

// get all events
const getEvents = async (req, res) => {
  //get user id
  const user_id = req.user._id

  // setting up filter query
  const filters = {user_id: user_id, ...req.query};
  
  if(filters.address){filters.address = {$regex: filters.address}};
  
  if(filters.title){filters.title = {$regex: filters.title}};

  if(filters.start)(filters.start = {$gte: filters.start});

  if(filters.end)(filters.start = {$lte: filters.end});

  //get all events associated with that user id
  const events = await Event.find(filters).sort({createdAt: -1})

  res.status(200).json(events)
}

// get one event
const getEvent = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such event'})
  }

  const event = await Event.findById(id)

  if (!event) {
    return res.status(404).json({error: 'No such event'})
  }
  
  res.status(200).json(event)
}


// create new event
const createEvent = async (req, res) => {
  const {title, address, start, end} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!address) {
    emptyFields.push('address')
  }
  if(!start) {
    emptyFields.push('start')
  }
  if(!end) {
    emptyFields.push('end')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }
  if(new Date(end) - new Date(start) <= 0){
    return res.status(400).json({error: `End time can't be before start time`,emptyFields});
  }

  //add doc to db
  try {
    //grab id of user and store it in the db ALONG with the event info
    //must need in order to assign events to different users or else everyone will have the same generic events
    const user_id = req.user._id
    const event = await Event.create({title, address, start,end, user_id})
    res.status(200).json(event)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete an event
const deleteEvent = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such event'})
  }

  const event = await Event.findOneAndDelete({_id: id})

  if (!event) {
    return res.status(400).json({error: 'No such event'})
  }

  res.status(200).json(event)
}

// update an event
const updateEvent = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such event'})
  }

  const event = await Event.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!event) {
    return res.status(400).json({error: 'No such event'})
  }

  res.status(200).json(event)
}


module.exports = {
  getEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent
}