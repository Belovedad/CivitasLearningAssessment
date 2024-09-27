const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  courseNumber: { type: String, required: true },
  description: { type: String, required: true }
});

courseSchema.index({ subject: 1, courseNumber: 1 }, { unique: true });

module.exports = mongoose.model('Course', courseSchema);