const StudentGrade = require('../../models/Grade');
const errorHandler = require('../../utils/errorHandler');

exports.createStudentGrade = async (req, res) => {
  try {
    const { rollNumber, name, grade } = req.body;
    const existingGrade = await StudentGrade.findOne({ rollNumber });
    if (existingGrade) {
      return res.status(400).json({ message: 'Roll number already exists' });
    }
    const studentGrade = new StudentGrade({ rollNumber, name, grade });
    await studentGrade.save();
    res.status(201).json(studentGrade);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.getStudentGradesByRollNumberAndPassword = async (req, res) => {
  try {
    const { rollNumber, password } = req.body;
    // Implement authentication and authorization here to ensure
    // that only the authorized student can access their grades using their password.
    const studentGrades = await StudentGrade.find({ rollNumber, password });
    if (studentGrades.length === 0) {
      res.status(404).json({ message: 'Student grades not found' });
    } else {
      res.json(studentGrades);
    }
  } catch (err) {
    errorHandler(err, res);
  }
};
