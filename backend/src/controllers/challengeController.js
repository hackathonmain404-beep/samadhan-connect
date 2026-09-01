const Challenge = require('../models/Challenge');
const Support = require('../models/Support');
const Comment = require('../models/Comment');
const Solution = require('../models/Solution');
const { createNotification } = require('../services/notificationService');

// @desc    Create a new challenge / report a problem
// @route   POST /api/challenges
// @access  Private (Citizens / Students / Any auth user)
const createChallenge = async (req, res, next) => {
  try {
    const {
      title,
      shortDescription,
      description,
      category,
      location,
      district,
      urgency = 'medium',
      affectedPeople,
      duration,
      expectedOutcome
    } = req.body;

    // Process uploaded evidence files if any
    let evidence = [];
    if (req.files && req.files.length > 0) {
      evidence = req.files.map((file) => ({
        url: `/uploads/${file.filename}`,
        fileType: file.mimetype.startsWith('image/')
          ? 'image'
          : file.mimetype.startsWith('video/')
          ? 'video'
          : 'document',
        originalName: file.originalname
      }));
    } else if (req.body.evidence) {
      try {
        evidence = typeof req.body.evidence === 'string' ? JSON.parse(req.body.evidence) : req.body.evidence;
      } catch (e) {
        evidence = [];
      }
    }

    const challenge = await Challenge.create({
      title,
      shortDescription: shortDescription || description.substring(0, 200) + '...',
      description,
      category,
      location,
      district,
      urgency,
      affectedPeople: affectedPeople || '100+',
      duration: duration || '',
      expectedOutcome: expectedOutcome || '',
      evidence,
      submittedBy: req.user._id,
      status: req.user.role === 'admin' || req.user.role === 'government' ? 'verified' : 'pending'
    });

    await challenge.populate('submittedBy', 'name email role location');

    // Notify user of successful submission
    await createNotification({
      user: req.user._id,
      title: 'Challenge Submitted',
      message: `Your challenge "${challenge.title}" in ${challenge.district} has been submitted and is pending verification.`,
      type: 'info',
      relatedChallenge: challenge._id
    });

    res.status(201).json({
      success: true,
      message: 'Challenge submitted successfully',
      challenge: {
        id: challenge._id,
        title: challenge.title,
        status: challenge.status
      },
      data: challenge
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all challenges with filtering, search, pagination, sorting
// @route   GET /api/challenges
// @access  Public
const getChallenges = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      district,
      urgency,
      status,
      sort = 'newest'
    } = req.query;

    const query = {};

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by district
    if (district) {
      query.district = new RegExp(district, 'i');
    }

    // Filter by urgency
    if (urgency) {
      query.urgency = urgency;
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Search keyword across title, description, location
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { district: { $regex: search, $options: 'i' } }
      ];
    }

    // Sort options
    let sortOption = { createdAt: -1 }; // newest
    if (sort === 'oldest') {
      sortOption = { createdAt: 1 };
    } else if (sort === 'popular') {
      sortOption = { supportCount: -1, createdAt: -1 };
    } else if (sort === 'urgency') {
      // Map urgency custom order or sort by urgency
      sortOption = { urgency: 1, createdAt: -1 };
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Challenge.countDocuments(query);
    const challenges = await Challenge.find(query)
      .populate('submittedBy', 'name email role location profileImage')
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      message: 'Challenges retrieved successfully',
      count: challenges.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: challenges
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single challenge details
// @route   GET /api/challenges/:id
// @access  Public
const getChallengeById = async (req, res, next) => {
  try {
    const challenge = await Challenge.findById(req.params.id)
      .populate('submittedBy', 'name email role location bio organization university profileImage');

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: `Challenge not found with ID: ${req.params.id}`
      });
    }

    // Get solutions count and list for this challenge
    const solutions = await Solution.find({ challenge: challenge._id })
      .populate('submittedBy', 'name role university organization')
      .select('title status university proposedTechnology expectedImpact createdAt');

    // Get comments for this challenge
    const comments = await Comment.find({ challenge: challenge._id })
      .populate('author', 'name role profileImage university organization')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Challenge details retrieved successfully',
      data: {
        ...challenge.toObject(),
        solutions,
        comments
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a challenge
// @route   PUT /api/challenges/:id
// @access  Private (Owner / Admin / Government)
const updateChallenge = async (req, res, next) => {
  try {
    let challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: `Challenge not found with ID: ${req.params.id}`
      });
    }

    // Check ownership or admin/government role
    const isOwner = challenge.submittedBy.toString() === req.user._id.toString();
    const isStaff = req.user.role === 'admin' || req.user.role === 'government';

    if (!isOwner && !isStaff) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this challenge'
      });
    }

    // Process new files if uploaded
    if (req.files && req.files.length > 0) {
      const newEvidence = req.files.map((file) => ({
        url: `/uploads/${file.filename}`,
        fileType: file.mimetype.startsWith('image/')
          ? 'image'
          : file.mimetype.startsWith('video/')
          ? 'video'
          : 'document',
        originalName: file.originalname
      }));
      req.body.evidence = [...challenge.evidence, ...newEvidence];
    }

    challenge = await Challenge.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('submittedBy', 'name email role location');

    res.status(200).json({
      success: true,
      message: 'Challenge updated successfully',
      data: challenge
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a challenge
// @route   DELETE /api/challenges/:id
// @access  Private (Owner / Admin)
const deleteChallenge = async (req, res, next) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: `Challenge not found with ID: ${req.params.id}`
      });
    }

    const isOwner = challenge.submittedBy.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this challenge'
      });
    }

    await Challenge.findByIdAndDelete(req.params.id);
    await Support.deleteMany({ challenge: req.params.id });
    await Comment.deleteMany({ challenge: req.params.id });

    res.status(200).json({
      success: true,
      message: 'Challenge deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Support / Upvote a challenge (Toggle support)
// @route   POST /api/challenges/:id/support
// @access  Private
const supportChallenge = async (req, res, next) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: `Challenge not found with ID: ${req.params.id}`
      });
    }

    const existingSupport = await Support.findOne({
      user: req.user._id,
      challenge: challenge._id
    });

    let supported = false;
    if (existingSupport) {
      // Remove support (downvote/unsupport)
      await Support.findByIdAndDelete(existingSupport._id);
      challenge.supportCount = Math.max(0, challenge.supportCount - 1);
      await challenge.save();
      supported = false;
    } else {
      // Add support
      await Support.create({
        user: req.user._id,
        challenge: challenge._id
      });
      challenge.supportCount += 1;
      await challenge.save();
      supported = true;

      // Notify challenge submitter
      if (challenge.submittedBy.toString() !== req.user._id.toString()) {
        await createNotification({
          user: challenge.submittedBy,
          title: 'New Supporter for Your Challenge',
          message: `${req.user.name} upvoted your challenge: "${challenge.title}"`,
          type: 'info',
          relatedChallenge: challenge._id
        });
      }
    }

    res.status(200).json({
      success: true,
      message: supported ? 'Challenge supported successfully' : 'Support removed',
      data: {
        supported,
        supportCount: challenge.supportCount
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Join a challenge as an interested student/team
// @route   POST /api/challenges/:id/join
// @access  Private
const joinChallenge = async (req, res, next) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: `Challenge not found with ID: ${req.params.id}`
      });
    }

    challenge.teamCount += 1;
    await challenge.save();

    await createNotification({
      user: challenge.submittedBy,
      title: 'New Team / Innovator Joined Challenge',
      message: `${req.user.name} (${req.user.role}) has expressed interest to solve your challenge: "${challenge.title}"`,
      type: 'success',
      relatedChallenge: challenge._id
    });

    res.status(200).json({
      success: true,
      message: 'Joined challenge successfully. You can now submit a solution proposal.',
      data: {
        teamCount: challenge.teamCount
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get comments for a challenge
// @route   GET /api/challenges/:id/comments
// @access  Public
const getChallengeComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ challenge: req.params.id })
      .populate('author', 'name role profileImage university organization')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Comments retrieved successfully',
      count: comments.length,
      data: comments
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add comment to a challenge
// @route   POST /api/challenges/:id/comments
// @access  Private
const addChallengeComment = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Comment text is required'
      });
    }

    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }

    const comment = await Comment.create({
      author: req.user._id,
      challenge: challenge._id,
      text
    });

    await comment.populate('author', 'name role profileImage university organization');

    // Notify challenge owner
    if (challenge.submittedBy.toString() !== req.user._id.toString()) {
      await createNotification({
        user: challenge.submittedBy,
        title: 'New Comment on Challenge',
        message: `${req.user.name} commented on "${challenge.title}"`,
        type: 'info',
        relatedChallenge: challenge._id
      });
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

// @desc    Get solutions for a challenge
// @route   GET /api/challenges/:id/solutions
// @access  Public
const getChallengeSolutions = async (req, res, next) => {
  try {
    const solutions = await Solution.find({ challenge: req.params.id })
      .populate('submittedBy', 'name role email university organization profileImage')
      .populate('team', 'name skills members')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Challenge solutions retrieved successfully',
      count: solutions.length,
      data: solutions
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit a solution to a challenge
// @route   POST /api/challenges/:id/solutions
// @access  Private (Students / Innovators / Teams)
const addChallengeSolution = async (req, res, next) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }

    const {
      title,
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

    // Increment solutionCount on challenge
    challenge.solutionCount += 1;
    await challenge.save();

    await solution.populate('submittedBy', 'name email role university profileImage');

    // Notify challenge owner
    await createNotification({
      user: challenge.submittedBy,
      title: 'New Solution Proposal Submitted',
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

module.exports = {
  createChallenge,
  getChallenges,
  getChallengeById,
  updateChallenge,
  deleteChallenge,
  supportChallenge,
  joinChallenge,
  getChallengeComments,
  addChallengeComment,
  getChallengeSolutions,
  addChallengeSolution
};
