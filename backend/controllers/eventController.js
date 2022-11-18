const Event = require('../models/eventModel')
const mongoose = require('mongoose')

// get all events
const getEvents = async (req, res) => {
  //get user id
  const user_id = req.user._id
  //get all events associated with that user id
  const events = await Event.find({ user_id }).sort({createdAt: -1})

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
  const {event_name, address, date} = req.body

  let emptyFields = []

  if(!event_name) {
    emptyFields.push('event_name')
  }
  if(!address) {
    emptyFields.push('address')
  }
  if(!date) {
    emptyFields.push('date')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  //add doc to db
  try {
    //grab id of user and store it in the db ALONG with the event info
    //must need in order to assign events to different users or else everyone will have the same generic events
    const user_id = req.user._id
    const event = await Event.create({event_name, address, date, user_id})
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