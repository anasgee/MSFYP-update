const Grade = require('../../models/Grade');

// Existing controller functions
const getAllGrades = async (req, res) => {
  try {
    const grades = await Grade.find();
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createGrade = async (req, res) => {
  const { name, rollNumber, session, del1, del2, del3 } = req.body;
  try {
    const existingGrade = await Grade.findOne({ rollNumber });
    if (existingGrade) {
      return res.status(400).json({ message: 'Roll number already exists' });
    }
    const grade = new Grade({ name, rollNumber, session, del1, del2, del3 });
    await grade.save();
    res.status(201).json(grade);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateGrade = async (req, res) => {
  const { id } = req.params;
  const { name, rollNumber, session, del1, del2, del3 } = req.body;
  try {
    const grade = await Grade.findById(id);
    if (!grade) {
      return res.status(404).json({ message: 'Grade not found' });
    }
    grade.name = name;
    grade.rollNumber = rollNumber;
    grade.session = session;
    grade.del1 = del1;
    grade.del2 = del2;
    grade.del3 = del3;
    await grade.save();
    res.json(grade);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteGrade = async (req, res) => {
  const { id } = req.params;
  try {
    const grade = await Grade.findById(id);
    if (!grade) {
      return res.status(404).json({ message: 'Grade not found' });
    }
    console.log('.......', grade)
    await grade.remove();
    res.json({ message: 'Grade removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// New controller function to get grades by roll number
const getStudentGradesByRollNumber = async (req, res) => {
  const { rollNumber } = req.params;
  try {
    const grades = await Grade.find({ rollNumber });
    if (!grades.length) {
      return res.status(404).json({ message: 'No grades found for this roll number' });
    }
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllGrades,
  createGrade,
  updateGrade,
  deleteGrade,
  getStudentGradesByRollNumber
};
