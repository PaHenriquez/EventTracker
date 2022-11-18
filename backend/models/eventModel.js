const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventSchema = new Schema({
  event_name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Event', eventSchema)