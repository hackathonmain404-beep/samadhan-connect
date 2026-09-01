const express = require('express');
const {
  getCitizenDashboard,
  getStudentDashboard,
  getUniversityDashboard,
  getIndustryDashboard,
  getGovernmentDashboard
} = require('../controllers/dashboardController');
const { requireAuth } = require('../middleware/auth');
const { requireRole } = require('../middleware/role');

const router = express.Router();

router.use(requireAuth);

router.get('/citizen', getCitizenDashboard);
router.get('/student', getStudentDashboard);
router.get('/university', getUniversityDashboard);
router.get('/industry', getIndustryDashboard);
router.get('/government', requireRole('government', 'admin'), getGovernmentDashboard);

module.exports = router;
