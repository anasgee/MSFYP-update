// models/StudentGrade.js
const mongoose = require('mongoose');

const studentGradeSchema = new mongoose.Schema({
  id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Student',
  },
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
