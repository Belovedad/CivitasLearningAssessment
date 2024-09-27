const express = require("express");
const Course = require("./models/course");
const router = express.Router();

router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while fetching courses." });
  }
});

router.post("/course", async (req, res) => {
  const { subject, courseNumber, description } = req.body;

  if (!/^\d{3}$/.test(courseNumber)) {
    return res.status(400).json({ error: 'Course number must be a three-digit, zero-padded integer like "033".' });
  }

  const existingCourse = await Course.findOne({ subject, courseNumber });
  if (existingCourse) {
    return res.status(400).json({ error: "A course with this subject and number already exists." });
  }

  const course = new Course({ subject, courseNumber, description });
  await course.save();
  res.status(201).json(course);
});

router.delete("/course/:id", async (req, res) => {
  try {
    const result = await Course.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: "Invalid course ID" });
  }
});

router.get("/courses/search", async (req, res) => {
  const { query } = req.query;
  try {
    const courses = await Course.find({ description: { $regex: query, $options: "i" } });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while searching for courses." });
  }
});

module.exports = router;
