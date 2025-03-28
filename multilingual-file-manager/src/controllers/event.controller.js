const Event = require('../models/event.model');
const eventQueue = require('../queues/queue');

exports.createEvent = async (req, res) => {
  try {
    const { title, description, location, dateTime, categories } = req.body;
    const creator = req.userId;

    const newEvent = new Event({
      title,
      description,
      location,
      dateTime,
      categories,
      creator,
    });

    await newEvent.save();

    eventQueue.add({ eventId: newEvent._id }, { delay: 5000 });

    res.status(201).json({ message: req.__('event.created'), event: newEvent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('creator', 'username'); // Populate creator's username
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { title, description, location, dateTime, categories } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { title, description, location, dateTime, categories },
      { new: true } // Return the updated document
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: req.__('event.deleted') });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.findEventsNear = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance } = req.query;

    if (!longitude || !latitude || !maxDistance) {
      return res.status(400).json({ message: 'Longitude, latitude, and maxDistance are required' });
    }

    const events = await Event.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: parseInt(maxDistance), // Max distance in meters
        },
      },
    }).populate('creator', 'username');

    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.filterEventsByCategory = async (req, res) => {
  try {
    const { categories } = req.query;

    if (!categories) {
      return res.status(400).json({ message: 'Categories query parameter is required' });
    }

    // Split the categories string into an array
    const categoryArray = categories.split(',');

    const events = await Event.find({ categories: { $in: categoryArray } }).populate('creator', 'username');

    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};