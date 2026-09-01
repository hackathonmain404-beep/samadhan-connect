const Comment = require('../models/Comment');
const Challenge = require('../models/Challenge');
const Project = require('../models/Project');
const { createNotification } = require('../services/notificationService');

// @desc    Add comment (on challenge or project)
// @route   POST /api/comments
// @access  Private
const createComment = async (req, res, next) => {
  try {
    const { challenge, project, text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Comment text is required'
      });
    }

    if (!challenge && !project) {
      return res.status(400).json({
        success: false,
        message: 'Must associate comment with either a challenge or a project'
      });
    }

    const comment = await Comment.create({
      author: req.user._id,
      challenge: challenge || null,
      project: project || null,
      text
    });

    await comment.populate('author', 'name role profileImage university organization');

    // Send notification
    if (challenge) {
      const ch = await Challenge.findById(challenge);
      if (ch && ch.submittedBy.toString() !== req.user._id.toString()) {
        await createNotification({
          user: ch.submittedBy,
          title: 'New Comment on Challenge',
          message: `${req.user.name} commented on "${ch.title}"`,
          type: 'info',
          relatedChallenge: ch._id
        });
      }
    }

    res.status(201).json({
      success: true,
      message: 'Comment posted successfully',
      data: comment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get comments for a challenge
// @route   GET /api/comments/challenge/:challengeId
// @access  Public
const getChallengeComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ challenge: req.params.challengeId })
      .populate('author', 'name role profileImage university organization')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Challenge comments retrieved successfully',
      count: comments.length,
      data: comments
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get comments for a project
// @route   GET /api/comments/project/:projectId
// @access  Public
const getProjectComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ project: req.params.projectId })
      .populate('author', 'name role profileImage university organization')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Project comments retrieved successfully',
      count: comments.length,
      data: comments
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private (Author / Admin)
const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    if (comment.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this comment'
      });
    }

    await Comment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComment,
  getChallengeComments,
  getProjectComments,
  deleteComment
};
