const express = require('express');
const { body } = require('express-validator');
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  updateProgress,
  addProjectMilestone,
  getProjectMilestones,
  addProjectUpdate,
  getProjectUpdates
} = require('../controllers/projectController');
const { requireAuth } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { validate } = require('../middleware/validate');

const router = express.Router();

const projectValidation = [
  body('name').trim().notEmpty().withMessage('Project name is required'),
  body('challenge').notEmpty().withMessage('Associated challenge ID is required'),
  body('solution').notEmpty().withMessage('Associated solution ID is required'),
  body('description').trim().notEmpty().withMessage('Project description is required')
];

router
  .route('/')
  .get(getProjects)
  .post(requireAuth, projectValidation, validate, createProject);

router
  .route('/:id')
  .get(getProjectById)
  .put(requireAuth, updateProject)
  .delete(requireAuth, deleteProject);

router.patch('/:id/progress', requireAuth, updateProgress);

router
  .route('/:projectId/milestones')
  .get(getProjectMilestones)
  .post(requireAuth, addProjectMilestone);

router
  .route('/:projectId/updates')
  .get(getProjectUpdates)
  .post(requireAuth, upload.array('attachments', 5), addProjectUpdate);

module.exports = router;
