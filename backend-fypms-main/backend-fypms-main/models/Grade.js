const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
  del1: {
    type: Number,
    required: true,
  },
  del2: {
    type: Number,
    required: true,
  },
  del3: {
    type: Number,
    required: true,
  }
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
