const express = require('express');
const { body } = require('express-validator');
const {
  getAllGrades,
  createGrade,
  updateGrade,
  deleteGrade,
  getStudentGradesByRollNumber
} = require('../controllers/admin/GradeController');

const router = express.Router();

router.get('/', getAllGrades);
router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('rollNumber').notEmpty().withMessage('Roll Number is required'),
  body('session').notEmpty().withMessage('Session is required'),
  body('del1').isFloat({ max: 25 }).withMessage('Deliverable 1 grade should not exceed 25'),
  body('del2').isFloat({ max: 25 }).withMessage('Deliverable 2 grade should not exceed 25'),
  body('del3').isFloat({ max: 50 }).withMessage('Final grade should not exceed 50')
], createGrade);
router.put('/:id', updateGrade);
router.delete('/:id', deleteGrade);

// New route to get grades by roll number
router.get('/student/:rollNumber', getStudentGradesByRollNumber);

module.exports = router;