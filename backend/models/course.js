const mongoose = require('mongoose');
const counter = require('./counter');

const courseSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  subject: { type: String, required: true },
  courseNumber: { type: String, required: true },
  description: { type: String, required: true }
});

courseSchema.index({ subject: 1, courseNumber: 1 }, { unique: true });

courseSchema.pre('save', function(next) {
  if (this.isNew) {
    counter.findByIdAndUpdate(
      { _id: 'courseId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    )
    .then(counter => {
      this.id = counter.seq;
      next();
    })
    .catch(error => next(error));
  } else {
    next();
  }
});


module.exports = mongoose.model('Course', courseSchema);