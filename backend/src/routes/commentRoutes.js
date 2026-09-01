const express = require('express');
const { body } = require('express-validator');
const {
  createComment,
  getChallengeComments,
  getProjectComments,
  deleteComment
} = require('../controllers/commentController');
const { requireAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

const router = express.Router();

router.post(
  '/',
  requireAuth,
  [body('text').trim().notEmpty().withMessage('Comment text is required')],
  validate,
  createComment
);

router.get('/challenge/:challengeId', getChallengeComments);
router.get('/project/:projectId', getProjectComments);
router.delete('/:id', requireAuth, deleteComment);

module.exports = router;
