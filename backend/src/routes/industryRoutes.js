const express = require('express');
const { body } = require('express-validator');
const {
  getIndustry,
  getIndustryById,
  createIndustry,
  updateIndustry
} = require('../controllers/industryController');
const { requireAuth } = require('../middleware/auth');
const { requireRole } = require('../middleware/role');
const { validate } = require('../middleware/validate');

const router = express.Router();

const industryValidation = [
  body('name').trim().notEmpty().withMessage('Company / partner name is required'),
  body('industry').trim().notEmpty().withMessage('Industry sector is required'),
  body('location').trim().notEmpty().withMessage('Location is required')
];

router
  .route('/')
  .get(getIndustry)
  .post(
    requireAuth,
    requireRole('admin', 'industry'),
    industryValidation,
    validate,
    createIndustry
  );

router
  .route('/:id')
  .get(getIndustryById)
  .put(requireAuth, requireRole('admin', 'industry'), updateIndustry);

module.exports = router;
