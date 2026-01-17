const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/electronics-diagrams', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Routes
const diagramRoutes = require('./routes/diagrams');
app.use('/api/diagrams', diagramRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});