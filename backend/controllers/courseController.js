const courseRepository = require("../repositories/courseRepository");

const courseController = {
  getAllCourses: async (req, res) => {
    try {
      const courses = await courseRepository.findAll();
      res.json(courses);
    } catch (err) {
      res.status(500).json({ error: "An error occurred while fetching courses." });
    }
  },

  createCourse: async (req, res) => {
    const { subject, courseNumber, description } = req.body;

    if (!/^\d{3}$/.test(courseNumber)) {
      return res.status(400).json({ error: 'Course number must be a three-digit, zero-padded integer like "033".' });
    }

    const existingCourse = await courseRepository.findOne({ subject, courseNumber });
    if (existingCourse) {
      return res.status(400).json({ error: "A course with this subject and number already exists." });
    }

    try {
      const course = await courseRepository.create({ subject, courseNumber, description });
      res.status(201).json(course);
    } catch (err) {
      res.status(500).json({ error: "An error occurred while creating the course." });
    }
  },

  deleteCourse: async (req, res) => {
    try {
      const result = await courseRepository.deleteById(req.params.id);
      if (!result) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.sendStatus(204);
    } catch (err) {
      res.status(400).json({ error: "Invalid course ID" });
    }
  },

  searchCourses: async (req, res) => {
    const { query } = req.query;
    try {
      const courses = await courseRepository.search(query);
      res.json(courses);
    } catch (err) {
      res.status(500).json({ error: "An error occurred while searching for courses." });
    }
  }
};

module.exports = courseController;