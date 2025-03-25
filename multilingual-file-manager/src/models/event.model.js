const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
  },
  dateTime: { type: Date, required: true },
  categories: [String],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

eventSchema.index({ location: '2dsphere' }); // Create 2dsphere index

module.exports = mongoose.model('Event', eventSchema);