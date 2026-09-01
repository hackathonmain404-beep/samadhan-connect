const express = require('express');
const { body } = require('express-validator');
const {
  createSolution,
  getSolutions,
  getSolutionById,
  updateSolution,
  deleteSolution
} = require('../controllers/solutionController');
const { requireAuth } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { validate } = require('../middleware/validate');

const router = express.Router();

const solutionValidation = [
  body('title').trim().notEmpty().withMessage('Solution title is required'),
  body('challenge').notEmpty().withMessage('Associated challenge ID is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('implementationPlan').trim().notEmpty().withMessage('Implementation plan is required'),
  body('expectedImpact').trim().notEmpty().withMessage('Expected impact is required')
];

router
  .route('/')
  .get(getSolutions)
  .post(requireAuth, upload.array('documents', 5), solutionValidation, validate, createSolution);

router
  .route('/:id')
  .get(getSolutionById)
  .put(requireAuth, upload.array('documents', 5), updateSolution)
  .delete(requireAuth, deleteSolution);

module.exports = router;
