const Challenge = require('../models/Challenge');
const Solution = require('../models/Solution');
const { createNotification } = require('../services/notificationService');

// @desc    Get all pending challenges for review
// @route   GET /api/admin/challenges/pending
// @access  Private (Government / Admin)
const getPendingChallenges = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Challenge.countDocuments({ status: 'pending' });
    const challenges = await Challenge.find({ status: 'pending' })
      .populate('submittedBy', 'name email role location phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      message: 'Pending challenges retrieved for verification',
      total,
      count: challenges.length,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: challenges
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify a challenge
// @route   PATCH /api/admin/challenges/:id/verify
// @access  Private (Government / Admin)
const verifyChallenge = async (req, res, next) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }

    challenge.status = 'verified';
    challenge.rejectionReason = '';
    challenge.requestedInfo = '';
    await challenge.save();

    // Notify citizen
    await createNotification({
      user: challenge.submittedBy,
      title: 'Challenge Verified by Government',
      message: `Your challenge "${challenge.title}" in ${challenge.district} has been verified and is now open for innovator solutions!`,
      type: 'success',
      relatedChallenge: challenge._id
    });

    res.status(200).json({
      success: true,
      message: 'Challenge verified successfully',
      data: challenge
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reject a challenge
// @route   PATCH /api/admin/challenges/:id/reject
// @access  Private (Government / Admin)
const rejectChallenge = async (req, res, next) => {
  try {
    const { reason } = req.body;

    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }

    challenge.status = 'rejected';
    challenge.rejectionReason = reason || 'Does not meet submission guidelines.';
    await challenge.save();

    // Notify citizen
    await createNotification({
      user: challenge.submittedBy,
      title: 'Challenge Submission Update',
      message: `Your challenge "${challenge.title}" was not approved. Reason: ${challenge.rejectionReason}`,
      type: 'warning',
      relatedChallenge: challenge._id
    });

    res.status(200).json({
      success: true,
      message: 'Challenge rejected',
      data: challenge
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Request more info from challenge submitter
// @route   PATCH /api/admin/challenges/:id/request-info
// @access  Private (Government / Admin)
const requestChallengeInfo = async (req, res, next) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide the information request message'
      });
    }

    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }

    challenge.status = 'under_review';
    challenge.requestedInfo = message;
    await challenge.save();

    // Notify citizen
    await createNotification({
      user: challenge.submittedBy,
      title: 'Additional Information Requested for Challenge',
      message: `Reviewer requested more info on "${challenge.title}": ${message}`,
      type: 'info',
      relatedChallenge: challenge._id
    });

    res.status(200).json({
      success: true,
      message: 'Information request sent to the citizen',
      data: challenge
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Approve a solution proposal
// @route   PATCH /api/admin/solutions/:id/approve
// @access  Private (Government / Admin)
const approveSolution = async (req, res, next) => {
  try {
    const { feedback } = req.body;

    const solution = await Solution.findById(req.params.id).populate('challenge');
    if (!solution) {
      return res.status(404).json({
        success: false,
        message: 'Solution not found'
      });
    }

    solution.status = 'approved';
    if (feedback) solution.feedback = feedback;
    await solution.save();

    // Notify student/team
    await createNotification({
      user: solution.submittedBy,
      title: 'Solution Proposal Approved!',
      message: `Congratulations! Your solution "${solution.title}" for "${solution.challenge.title}" has been approved by the panel.`,
      type: 'success',
      relatedSolution: solution._id,
      relatedChallenge: solution.challenge._id
    });

    res.status(200).json({
      success: true,
      message: 'Solution approved successfully',
      data: solution
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reject a solution proposal
// @route   PATCH /api/admin/solutions/:id/reject
// @access  Private (Government / Admin)
const rejectSolution = async (req, res, next) => {
  try {
    const { feedback } = req.body;

    const solution = await Solution.findById(req.params.id).populate('challenge');
    if (!solution) {
      return res.status(404).json({
        success: false,
        message: 'Solution not found'
      });
    }

    solution.status = 'rejected';
    solution.feedback = feedback || 'Proposal does not satisfy current project requirements.';
    await solution.save();

    // Notify submitter
    await createNotification({
      user: solution.submittedBy,
      title: 'Solution Proposal Status Update',
      message: `Your solution proposal "${solution.title}" was not approved. Feedback: ${solution.feedback}`,
      type: 'warning',
      relatedSolution: solution._id,
      relatedChallenge: solution.challenge._id
    });

    res.status(200).json({
      success: true,
      message: 'Solution proposal rejected',
      data: solution
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPendingChallenges,
  verifyChallenge,
  rejectChallenge,
  requestChallengeInfo,
  approveSolution,
  rejectSolution
};
