require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const Course = require('./models/course');
const Counter = require('./models/counter');
const Routes = require('./routes');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error("MONGODB_URI is not defined. Please check your .env file.");
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

Counter.findByIdAndUpdate(
  { _id: 'courseId' },
  { $setOnInsert: { seq: 0 } },
  { upsert: true, new: true }
).then(() => console.log('Initialized counter.')).catch(console.error);

app.use('/api', Routes);

module.exports = app;

