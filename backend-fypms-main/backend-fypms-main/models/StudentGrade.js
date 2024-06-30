// models/StudentGrade.js
const mongoose = require('mongoose');

const studentGradeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  grade: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('StudentGrade', studentGradeSchema);
