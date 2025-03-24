const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
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
const fileRoutes = require('./routes/file.routes');

app.use('/auth', authRoutes);
app.use('/files', fileRoutes);