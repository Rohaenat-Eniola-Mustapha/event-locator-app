const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  dateTime: { type: Date, required: true },
  categories: [{ type: String }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

eventSchema.index({ location: '2dsphere' }); // Create 2dsphere index

module.exports = mongoose.model('Event', eventSchema);