const express = require('express');
const {
  getPendingChallenges,
  verifyChallenge,
  rejectChallenge,
  requestChallengeInfo,
  approveSolution,
  rejectSolution
} = require('../controllers/adminController');
const { requireAuth } = require('../middleware/auth');
const { requireRole } = require('../middleware/role');

const router = express.Router();

// All admin/government routes require auth and role
router.use(requireAuth, requireRole('government', 'admin'));

router.get('/challenges/pending', getPendingChallenges);
router.patch('/challenges/:id/verify', verifyChallenge);
router.patch('/challenges/:id/reject', rejectChallenge);
router.patch('/challenges/:id/request-info', requestChallengeInfo);

router.patch('/solutions/:id/approve', approveSolution);
router.patch('/solutions/:id/reject', rejectSolution);

module.exports = router;
