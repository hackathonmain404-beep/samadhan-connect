const express = require('express');
const { updateMilestone, deleteMilestone } = require('../controllers/milestoneController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router
  .route('/:id')
  .put(requireAuth, updateMilestone)
  .delete(requireAuth, deleteMilestone);

module.exports = router;
