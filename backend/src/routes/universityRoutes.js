const express = require('express');
const { body } = require('express-validator');
const {
  getUniversities,
  getUniversityById,
  createUniversity,
  updateUniversity
} = require('../controllers/universityController');
const { requireAuth } = require('../middleware/auth');
const { requireRole } = require('../middleware/role');
const { validate } = require('../middleware/validate');

const router = express.Router();

const universityValidation = [
  body('name').trim().notEmpty().withMessage('University name is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('district').trim().notEmpty().withMessage('Jharkhand district is required')
];

router
  .route('/')
  .get(getUniversities)
  .post(
    requireAuth,
    requireRole('admin', 'university'),
    universityValidation,
    validate,
    createUniversity
  );

router
  .route('/:id')
  .get(getUniversityById)
  .put(requireAuth, requireRole('admin', 'university'), updateUniversity);

module.exports = router;
