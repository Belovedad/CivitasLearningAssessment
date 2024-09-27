const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')
const Course = require('./models/course');
const Counter = require('./models/counter');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

Counter.findByIdAndUpdate(
  { _id: 'courseId' },
  { $setOnInsert: { seq: 0 } },
  { upsert: true, new: true }
).then(() => console.log('Initialized counter.')).catch(console.error);


app.get('/api/courses', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

app.post('/api/course', async (req, res) => {
  const { subject, courseNumber, description } = req.body;

  if (!/^\d{3}$/.test(courseNumber)) {
    return res.status(400).json({ error: 'Course number must be a three-digit, zero-padded integer like "033".' });
  }

  const existingCourse = await Course.findOne({ subject, courseNumber });
  if (existingCourse) {
    return res.status(400).json({ error: 'A course with this subject and number already exists.' });
  }

  const course = new Course({ subject, courseNumber, description });
  await course.save();
  res.status(201).json(course);
});

app.delete('/api/course/:id', async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

app.get('/api/courses/search', async (req, res) => {
  const { query } = req.query;
  const courses = await Course.find({ description: { $regex: query, $options: 'i' } });
  res.json(courses);
});

app.listen(port, () => console.log(`Server listening on port ${port}`));