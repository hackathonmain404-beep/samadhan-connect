const express = require('express');
const { body } = require('express-validator');
const {
  createTeam,
  getTeams,
  getTeamById,
  updateTeam,
  addTeamMember,
  removeTeamMember,
  inviteMember
} = require('../controllers/teamController');
const { requireAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

const router = express.Router();

const teamValidation = [
  body('name').trim().notEmpty().withMessage('Team name is required')
];

router
  .route('/')
  .get(getTeams)
  .post(requireAuth, teamValidation, validate, createTeam);

router
  .route('/:id')
  .get(getTeamById)
  .put(requireAuth, updateTeam);

router.post('/:id/members', requireAuth, addTeamMember);
router.delete('/:id/members/:userId', requireAuth, removeTeamMember);
router.post('/:id/invite', requireAuth, inviteMember);

module.exports = router;
