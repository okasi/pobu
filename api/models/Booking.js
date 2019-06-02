const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const bookingSchema = new Schema({
  _host: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  _client: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  name: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  fee: {
    type: Number,
  },

  nanoWalletPublicKey: {
    type: String,
  },

  communication: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Booking', bookingSchema)