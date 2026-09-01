const express = require('express');
const { body } = require('express-validator');
const {
  createChallenge,
  getChallenges,
  getChallengeById,
  updateChallenge,
  deleteChallenge,
  supportChallenge,
  joinChallenge,
  getChallengeComments,
  addChallengeComment,
  getChallengeSolutions,
  addChallengeSolution
} = require('../controllers/challengeController');
const { requireAuth } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { validate } = require('../middleware/validate');

const router = express.Router();

const challengeValidation = [
  body('title').trim().notEmpty().withMessage('Challenge title is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('district').trim().notEmpty().withMessage('Jharkhand district is required'),
  body('location').trim().notEmpty().withMessage('Specific location is required')
];

router
  .route('/')
  .get(getChallenges)
  .post(requireAuth, upload.array('evidence', 5), challengeValidation, validate, createChallenge);

router
  .route('/:id')
  .get(getChallengeById)
  .put(requireAuth, upload.array('evidence', 5), updateChallenge)
  .delete(requireAuth, deleteChallenge);

router.post('/:id/support', requireAuth, supportChallenge);
router.post('/:id/join', requireAuth, joinChallenge);

router
  .route('/:id/comments')
  .get(getChallengeComments)
  .post(requireAuth, addChallengeComment);

router
  .route('/:id/solutions')
  .get(getChallengeSolutions)
  .post(requireAuth, upload.array('documents', 5), addChallengeSolution);

module.exports = router;
