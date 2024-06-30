// const Student = require('../models/studentModel');

// const getStudents = async (req, res) => {
//   try {
//     const students = await Student.find();
//     res.status(200).json(students);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error', error });
//   }
// };

// const addGrades = async (req, res) => {
//   const { name, rollNumber, classId, image, cgpa, del1, del2, del3 } = req.body;

//   try {
//     const student = await Student.findOne({ name, rollNumber, classId, image, cgpa });

//     if (!student) {
//       return res.status(404).json({ message: 'Student not found' });
//     }

//     student.grades.del1 = del1;
//     student.grades.del2 = del2;
//     student.grades.del3 = del3;

//     await student.save();

//     res.status(200).json({ message: 'Grades updated successfully', student });
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error', error });
//   }
// };

// module.exports = { getStudents, addGrades };



// controllers/studentController.js



const Student = require("../models/studentModel");

// Fetch all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("classId").populate("assignedProjectId");
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch single student
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("classId").populate("assignedProjectId");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update grades
const updateGrades = async (req, res) => {
  const { del1, del2, del3 } = req.body;
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      student.grades.del1 = del1;
      student.grades.del2 = del2;
      student.grades.del3 = del3;
      student.marks = del1 + del2 + del3;
      await student.save();
      res.json(student);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  updateGrades,
};
