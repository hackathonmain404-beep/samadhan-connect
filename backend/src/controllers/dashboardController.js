const Challenge = require('../models/Challenge');
const Solution = require('../models/Solution');
const Project = require('../models/Project');
const Team = require('../models/Team');
const University = require('../models/University');
const IndustryPartner = require('../models/IndustryPartner');
const Support = require('../models/Support');

// @desc    Get citizen dashboard metrics
// @route   GET /api/dashboard/citizen
// @access  Private (Citizen)
const getCitizenDashboard = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const [
      problemsSubmitted,
      pendingProblems,
      verifiedProblems,
      activeProblems,
      resolvedProblems,
      recentChallenges
    ] = await Promise.all([
      Challenge.countDocuments({ submittedBy: userId }),
      Challenge.countDocuments({ submittedBy: userId, status: 'pending' }),
      Challenge.countDocuments({ submittedBy: userId, status: 'verified' }),
      Challenge.countDocuments({ submittedBy: userId, status: 'in_progress' }),
      Challenge.countDocuments({ submittedBy: userId, status: 'resolved' }),
      Challenge.find({ submittedBy: userId })
        .sort({ createdAt: -1 })
        .limit(5)
    ]);

    res.status(200).json({
      success: true,
      message: 'Citizen dashboard metrics retrieved successfully',
      data: {
        problemsSubmitted,
        pendingProblems,
        verifiedProblems,
        activeProblems,
        resolvedProblems,
        recentChallenges
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get student dashboard metrics
// @route   GET /api/dashboard/student
// @access  Private (Student)
const getStudentDashboard = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Find teams student is part of
    const userTeams = await Team.find({
      $or: [{ leader: userId }, { members: userId }]
    }).select('_id');
    const teamIds = userTeams.map((t) => t._id);

    const [
      solutionsSubmitted,
      activeProjects,
      completedProjects,
      recommendedChallenges
    ] = await Promise.all([
      Solution.countDocuments({ submittedBy: userId }),
      Project.countDocuments({
        $or: [{ team: { $in: teamIds } }, { 'team.leader': userId }],
        status: { $in: ['research', 'prototype', 'testing', 'implementation'] }
      }),
      Project.countDocuments({
        $or: [{ team: { $in: teamIds } }, { 'team.leader': userId }],
        status: 'completed'
      }),
      // Recommended challenges: verified or open challenges
      Challenge.find({ status: { $in: ['verified', 'open'] } })
        .sort({ supportCount: -1, createdAt: -1 })
        .limit(6)
    ]);

    res.status(200).json({
      success: true,
      message: 'Student dashboard metrics retrieved successfully',
      data: {
        challengesJoined: userTeams.length,
        solutionsSubmitted,
        activeProjects,
        completedProjects,
        recommendedChallenges
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get university dashboard metrics
// @route   GET /api/dashboard/university
// @access  Private (University)
const getUniversityDashboard = async (req, res, next) => {
  try {
    const universityName = req.user.university || req.user.organization || '';

    const universityFilter = universityName
      ? { university: new RegExp(universityName, 'i') }
      : {};

    const [
      studentTeams,
      activeProjects,
      completedProjects,
      challenges,
      solutions
    ] = await Promise.all([
      Team.countDocuments(universityFilter),
      Project.countDocuments({
        ...universityFilter,
        status: { $in: ['research', 'prototype', 'testing', 'implementation'] }
      }),
      Project.countDocuments({ ...universityFilter, status: 'completed' }),
      Challenge.countDocuments({ status: { $in: ['verified', 'open', 'in_progress'] } }),
      Solution.countDocuments(universityFilter)
    ]);

    res.status(200).json({
      success: true,
      message: 'University dashboard metrics retrieved successfully',
      data: {
        studentTeams,
        activeProjects,
        completedProjects,
        challenges,
        solutions
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get industry dashboard metrics
// @route   GET /api/dashboard/industry
// @access  Private (Industry)
const getIndustryDashboard = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const [
      projectsMentored,
      projectsSupported,
      universitiesConnected,
      activeCollaborations
    ] = await Promise.all([
      Project.countDocuments({ industryMentor: userId }),
      Solution.countDocuments({ industrySupportRequired: true }),
      University.countDocuments(),
      Project.find({ industryMentor: userId })
        .populate('challenge', 'title category district')
        .populate('team', 'name university members')
        .limit(5)
    ]);

    res.status(200).json({
      success: true,
      message: 'Industry dashboard metrics retrieved successfully',
      data: {
        projectsMentored,
        projectsSupported,
        universitiesConnected,
        activeCollaborations
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get government & admin dashboard metrics with chart analytics
// @route   GET /api/dashboard/government
// @access  Private (Government / Admin)
const getGovernmentDashboard = async (req, res, next) => {
  try {
    const [
      totalChallenges,
      pendingVerification,
      verifiedChallenges,
      activeProjects,
      completedProjects,
      challengesByCategoryRaw,
      challengesByDistrictRaw,
      monthlySubmissionsRaw,
      totalSolutions,
      approvedSolutions
    ] = await Promise.all([
      Challenge.countDocuments(),
      Challenge.countDocuments({ status: 'pending' }),
      Challenge.countDocuments({ status: { $in: ['verified', 'open'] } }),
      Project.countDocuments({ status: { $ne: 'completed' } }),
      Project.countDocuments({ status: 'completed' }),

      // Challenges aggregated by category
      Challenge.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $project: { category: '$_id', count: 1, _id: 0 } },
        { $sort: { count: -1 } }
      ]),

      // Challenges aggregated by district
      Challenge.aggregate([
        { $group: { _id: '$district', count: { $sum: 1 } } },
        { $project: { district: '$_id', count: 1, _id: 0 } },
        { $sort: { count: -1 } }
      ]),

      // Monthly submissions for the current year
      Challenge.aggregate([
        {
          $group: {
            _id: { $month: '$createdAt' },
            count: { $sum: 1 }
          }
        },
        { $sort: { '_id': 1 } }
      ]),

      Solution.countDocuments(),
      Solution.countDocuments({ status: { $in: ['approved', 'completed'] } })
    ]);

    // Format monthly submissions
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const monthlySubmissions = monthNames.map((name, index) => {
      const found = monthlySubmissionsRaw.find((m) => m._id === index + 1);
      return {
        month: name,
        count: found ? found.count : 0
      };
    });

    const solutionSuccessRate =
      totalSolutions > 0
        ? Math.round((approvedSolutions / totalSolutions) * 100)
        : 0;

    res.status(200).json({
      success: true,
      message: 'Government analytics dashboard retrieved successfully',
      data: {
        totalChallenges,
        pendingVerification,
        verifiedChallenges,
        activeProjects,
        completedProjects,
        charts: {
          challengesByCategory: challengesByCategoryRaw,
          challengesByDistrict: challengesByDistrictRaw,
          monthlySubmissions,
          solutionSuccessRate
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCitizenDashboard,
  getStudentDashboard,
  getUniversityDashboard,
  getIndustryDashboard,
  getGovernmentDashboard
};
