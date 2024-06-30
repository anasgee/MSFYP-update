const express = require('express');
const router = express.Router();
const studentGradeController = require('../controllers/student/studentGradeController');

// POST route to create a new student grade
router.post('/', studentGradeController.createStudentGrade);

// POST route to get student grades by roll number and password
router.post('/search', studentGradeController.getStudentGradesByRollNumberAndPassword);

module.exports = router;
