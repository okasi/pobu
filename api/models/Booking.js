const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const bookingSchema = new Schema({
  host: {
		type: Schema.Types.Object,
		required: true
  },
  
  name: {
    type: String,
    required: true,
    unique: true,
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
    // default: 0,
  },

  nanoWalletPublicKey: {
    type: String,
    // default: "",
  },

  communication: {
    type: String,
    required: true,
  },

  client: {
    type: Schema.Types.Object,
  },

  createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Booking', bookingSchema)