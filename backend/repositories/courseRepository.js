const Course = require("../models/course");

const courseRepository = {
  findAll: async () => {
    return await Course.find();
  },

  findOne: async (criteria) => {
    return await Course.findOne(criteria);
  },

  create: async (courseData) => {
    const course = new Course(courseData);
    return await course.save();
  },

  deleteById: async (id) => {
    return await Course.findByIdAndDelete(id);
  },

  search: async (query) => {
    return await Course.find({ description: { $regex: query, $options: "i" } });
  }
};

module.exports = courseRepository;