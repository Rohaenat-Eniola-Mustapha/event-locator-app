const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const i18n = require('./i18n');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(i18n.init);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  family: 4,
}).then(() => {
    console.log("Worker connected to DB");

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
            console.error(error.stack);
        }
    });

    console.log('Event worker started');
}).catch(e => {
    console.log("Worker DB connection error: ", e);
});

// Basic route to test the server
app.get('/', (req, res) => {
  res.send('Multilingual File Manager API');
});

// Import and use routes
const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/event.routes');
const categoryRoutes = require('./routes/category.routes');

app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/categories', categoryRoutes);