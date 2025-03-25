const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Database connection (removed deprecated options)
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
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