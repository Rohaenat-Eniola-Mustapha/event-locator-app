const eventQueue = require('./queues/queue');
const Event = require('./models/event.model');

eventQueue.process(async (job) => {
    const { eventId } = job.data;
  
    try {
      console.log(`Processing event ID: ${eventId}`); // Debugging line
      const event = await Event.findById(eventId); // Use findById
      if (event) {
        console.log(`Found event: ${event.title}`);
        // Add your processing logic here (e.g., send notifications)
      } else {
        console.log(`Event with ID ${eventId} not found.`);
      }
    } catch (error) {
      console.error(`Error processing event ${eventId}:`, error);
    }
  });