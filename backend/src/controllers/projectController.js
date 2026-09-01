const Project = require('../models/Project');
const Milestone = require('../models/Milestone');
const ProjectUpdate = require('../models/ProjectUpdate');
const Solution = require('../models/Solution');
const Challenge = require('../models/Challenge');
const { createNotification } = require('../services/notificationService');

// @desc    Create a project from an approved solution
// @route   POST /api/projects
// @access  Private (Admin / Govt / University / Team)
const createProject = async (req, res, next) => {
  try {
    const {
      name,
      challenge: challengeId,
      solution: solutionId,
      team,
      university,
      industryMentor,
      governmentCoordinator,
      status = 'research',
      progress = 0,
      description,
      startDate,
      expectedCompletionDate
    } = req.body;

    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Associated challenge not found'
      });
    }

    const solution = await Solution.findById(solutionId);
    if (!solution) {
      return res.status(404).json({
        success: false,
        message: 'Associated solution not found'
      });
    }

    const project = await Project.create({
      name,
      challenge: challenge._id,
      solution: solution._id,
      team: team || solution.team || null,
      university: university || solution.university || req.user.university || '',
      industryMentor: industryMentor || null,
      governmentCoordinator: governmentCoordinator || (req.user.role === 'government' ? req.user._id : null),
      status,
      progress,
      description,
      startDate: startDate || Date.now(),
      expectedCompletionDate
    });

    // Update challenge status to in_progress
    challenge.status = 'in_progress';
    await challenge.save();

    // Update solution status to approved
    solution.status = 'approved';
    await solution.save();

    // Notify solution submitter
    await createNotification({
      user: solution.submittedBy,
      title: 'Project Initiated!',
      message: `Your solution "${solution.title}" has officially launched as the project "${project.name}".`,
      type: 'success',
      relatedChallenge: challenge._id,
      relatedSolution: solution._id,
      relatedProject: project._id
    });

    await project.populate([
      { path: 'challenge', select: 'title category district' },
      { path: 'solution', select: 'title proposedTechnology' },
      { path: 'team', select: 'name members' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all projects with filtering
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res, next) => {
  try {
    const {
      status,
      university,
      team,
      search,
      page = 1,
      limit = 10
    } = req.query;

    const query = {};

    if (status) query.status = status;
    if (university) query.university = new RegExp(university, 'i');
    if (team) query.team = team;

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Project.countDocuments(query);
    const projects = await Project.find(query)
      .populate('challenge', 'title category district location')
      .populate('solution', 'title proposedTechnology')
      .populate('team', 'name leader members')
      .populate('industryMentor', 'name organization email')
      .populate('governmentCoordinator', 'name organization email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      message: 'Projects retrieved successfully',
      count: projects.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single project details
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('challenge')
      .populate('solution')
      .populate({
        path: 'team',
        populate: { path: 'members leader', select: 'name email role university profileImage' }
      })
      .populate('industryMentor', 'name email organization profileImage')
      .populate('governmentCoordinator', 'name email organization profileImage');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const milestones = await Milestone.find({ project: project._id }).sort({ dueDate: 1 });
    const updates = await ProjectUpdate.find({ project: project._id })
      .populate('author', 'name role profileImage')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Project details retrieved successfully',
      data: {
        ...project.toObject(),
        milestones,
        updates
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('challenge solution team industryMentor governmentCoordinator');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin only)
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    await Milestone.deleteMany({ project: req.params.id });
    await ProjectUpdate.deleteMany({ project: req.params.id });

    res.status(200).json({
      success: true,
      message: 'Project and associated milestones deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update project progress and status
// @route   PATCH /api/projects/:id/progress
// @access  Private
const updateProgress = async (req, res, next) => {
  try {
    const { progress, status } = req.body;

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    if (progress !== undefined) {
      project.progress = Math.min(100, Math.max(0, Number(progress)));
    }

    if (status) {
      project.status = status;
      if (status === 'completed' && project.progress < 100) {
        project.progress = 100;
      }
    }

    await project.save();

    res.status(200).json({
      success: true,
      message: 'Project progress updated successfully',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add milestone to project
// @route   POST /api/projects/:projectId/milestones
// @access  Private
const addProjectMilestone = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { title, description, status = 'pending', dueDate } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const milestone = await Milestone.create({
      project: project._id,
      title,
      description: description || '',
      status,
      dueDate: dueDate || null,
      completedAt: status === 'completed' ? new Date() : null
    });

    res.status(201).json({
      success: true,
      message: 'Milestone added successfully',
      data: milestone
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get project milestones
// @route   GET /api/projects/:projectId/milestones
// @access  Public
const getProjectMilestones = async (req, res, next) => {
  try {
    const milestones = await Milestone.find({ project: req.params.projectId }).sort({ dueDate: 1 });
    res.status(200).json({
      success: true,
      message: 'Milestones retrieved successfully',
      count: milestones.length,
      data: milestones
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add progress update to project
// @route   POST /api/projects/:projectId/updates
// @access  Private
const addProjectUpdate = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { title, description } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    let attachments = [];
    if (req.files && req.files.length > 0) {
      attachments = req.files.map((file) => ({
        url: `/uploads/${file.filename}`,
        fileType: file.mimetype.startsWith('image/') ? 'image' : 'document',
        originalName: file.originalname
      }));
    }

    const update = await ProjectUpdate.create({
      project: project._id,
      author: req.user._id,
      title,
      description,
      attachments
    });

    await update.populate('author', 'name role profileImage');

    res.status(201).json({
      success: true,
      message: 'Project update published successfully',
      data: update
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get project updates
// @route   GET /api/projects/:projectId/updates
// @access  Public
const getProjectUpdates = async (req, res, next) => {
  try {
    const updates = await ProjectUpdate.find({ project: req.params.projectId })
      .populate('author', 'name role profileImage university organization')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Project updates retrieved successfully',
      count: updates.length,
      data: updates
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
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
};
