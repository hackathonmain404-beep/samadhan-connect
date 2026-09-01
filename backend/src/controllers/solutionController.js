const Solution = require('../models/Solution');
const Challenge = require('../models/Challenge');
const { createNotification } = require('../services/notificationService');

// @desc    Submit a new solution proposal
// @route   POST /api/solutions
// @access  Private
const createSolution = async (req, res, next) => {
  try {
    const {
      title,
      challenge: challengeId,
      description,
      team,
      university,
      proposedTechnology,
      implementationPlan,
      expectedImpact,
      estimatedDuration,
      requiredResources,
      industrySupportRequired
    } = req.body;

    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Associated challenge not found'
      });
    }

    let documents = [];
    if (req.files && req.files.length > 0) {
      documents = req.files.map((file) => ({
        url: `/uploads/${file.filename}`,
        fileType: file.mimetype.startsWith('image/') ? 'image' : 'document',
        originalName: file.originalname
      }));
    }

    const techArray = Array.isArray(proposedTechnology)
      ? proposedTechnology
      : typeof proposedTechnology === 'string'
      ? proposedTechnology.split(',').map((t) => t.trim())
      : [];

    const solution = await Solution.create({
      title,
      challenge: challenge._id,
      description,
      team: team || null,
      university: university || req.user.university || '',
      proposedTechnology: techArray,
      implementationPlan,
      expectedImpact,
      estimatedDuration: estimatedDuration || '3 months',
      requiredResources: requiredResources || '',
      industrySupportRequired: industrySupportRequired === 'true' || industrySupportRequired === true,
      documents,
      submittedBy: req.user._id,
      status: 'submitted'
    });

    challenge.solutionCount += 1;
    await challenge.save();

    await solution.populate([
      { path: 'submittedBy', select: 'name email role university organization profileImage' },
      { path: 'challenge', select: 'title category district urgency' }
    ]);

    // Notify challenge owner
    await createNotification({
      user: challenge.submittedBy,
      title: 'New Solution Proposal',
      message: `${req.user.name} submitted a solution "${solution.title}" for your challenge "${challenge.title}".`,
      type: 'success',
      relatedChallenge: challenge._id,
      relatedSolution: solution._id
    });

    res.status(201).json({
      success: true,
      message: 'Solution proposal submitted successfully',
      data: solution
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all solutions with filters
// @route   GET /api/solutions
// @access  Public
const getSolutions = async (req, res, next) => {
  try {
    const {
      challenge,
      status,
      submittedBy,
      university,
      search,
      page = 1,
      limit = 10
    } = req.query;

    const query = {};

    if (challenge) query.challenge = challenge;
    if (status) query.status = status;
    if (submittedBy) query.submittedBy = submittedBy;
    if (university) query.university = new RegExp(university, 'i');

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { proposedTechnology: { $regex: search, $options: 'i' } }
      ];
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Solution.countDocuments(query);
    const solutions = await Solution.find(query)
      .populate('submittedBy', 'name email role university organization profileImage')
      .populate('challenge', 'title category district status urgency')
      .populate('team', 'name skills')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      message: 'Solutions retrieved successfully',
      count: solutions.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: solutions
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get solution by ID
// @route   GET /api/solutions/:id
// @access  Public
const getSolutionById = async (req, res, next) => {
  try {
    const solution = await Solution.findById(req.params.id)
      .populate('submittedBy', 'name email role university organization profileImage bio location')
      .populate('challenge')
      .populate('team');

    if (!solution) {
      return res.status(404).json({
        success: false,
        message: 'Solution not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Solution retrieved successfully',
      data: solution
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a solution proposal
// @route   PUT /api/solutions/:id
// @access  Private (Owner / Admin / Govt)
const updateSolution = async (req, res, next) => {
  try {
    let solution = await Solution.findById(req.params.id);

    if (!solution) {
      return res.status(404).json({
        success: false,
        message: 'Solution not found'
      });
    }

    const isOwner = solution.submittedBy.toString() === req.user._id.toString();
    const isStaff = req.user.role === 'admin' || req.user.role === 'government';

    if (!isOwner && !isStaff) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this solution proposal'
      });
    }

    if (req.files && req.files.length > 0) {
      const newDocs = req.files.map((file) => ({
        url: `/uploads/${file.filename}`,
        fileType: file.mimetype.startsWith('image/') ? 'image' : 'document',
        originalName: file.originalname
      }));
      req.body.documents = [...solution.documents, ...newDocs];
    }

    if (req.body.proposedTechnology && typeof req.body.proposedTechnology === 'string') {
      req.body.proposedTechnology = req.body.proposedTechnology.split(',').map((t) => t.trim());
    }

    solution = await Solution.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('submittedBy', 'name email role university');

    res.status(200).json({
      success: true,
      message: 'Solution updated successfully',
      data: solution
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a solution proposal
// @route   DELETE /api/solutions/:id
// @access  Private (Owner / Admin)
const deleteSolution = async (req, res, next) => {
  try {
    const solution = await Solution.findById(req.params.id);

    if (!solution) {
      return res.status(404).json({
        success: false,
        message: 'Solution not found'
      });
    }

    const isOwner = solution.submittedBy.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this solution'
      });
    }

    await Solution.findByIdAndDelete(req.params.id);

    // Decrement count on challenge
    await Challenge.findByIdAndUpdate(solution.challenge, {
      $inc: { solutionCount: -1 }
    });

    res.status(200).json({
      success: true,
      message: 'Solution proposal deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSolution,
  getSolutions,
  getSolutionById,
  updateSolution,
  deleteSolution
};
