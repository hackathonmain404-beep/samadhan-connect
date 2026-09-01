const Team = require('../models/Team');
const User = require('../models/User');
const { createNotification } = require('../services/notificationService');

// @desc    Create a new team
// @route   POST /api/teams
// @access  Private (Students / Innovators)
const createTeam = async (req, res, next) => {
  try {
    const { name, university, skills, memberIds } = req.body;

    const skillsArray = Array.isArray(skills)
      ? skills
      : typeof skills === 'string'
      ? skills.split(',').map((s) => s.trim())
      : [];

    const members = memberIds && Array.isArray(memberIds) ? memberIds : [req.user._id];
    if (!members.includes(req.user._id.toString())) {
      members.push(req.user._id);
    }

    const team = await Team.create({
      name,
      leader: req.user._id,
      members,
      university: university || req.user.university || '',
      skills: skillsArray
    });

    await team.populate([
      { path: 'leader', select: 'name email role university profileImage' },
      { path: 'members', select: 'name email role university profileImage' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Team created successfully',
      data: team
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all teams
// @route   GET /api/teams
// @access  Public
const getTeams = async (req, res, next) => {
  try {
    const { university, search, page = 1, limit = 10 } = req.query;
    const query = {};

    if (university) query.university = new RegExp(university, 'i');
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { skills: { $regex: search, $options: 'i' } }
      ];
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Team.countDocuments(query);
    const teams = await Team.find(query)
      .populate('leader', 'name email university profileImage')
      .populate('members', 'name email university profileImage')
      .populate('currentChallenge', 'title category district')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      message: 'Teams retrieved successfully',
      count: teams.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: teams
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single team by ID
// @route   GET /api/teams/:id
// @access  Public
const getTeamById = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('leader', 'name email role university bio skills profileImage')
      .populate('members', 'name email role university skills profileImage')
      .populate('currentChallenge')
      .populate('projects');

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Team retrieved successfully',
      data: team
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update team
// @route   PUT /api/teams/:id
// @access  Private (Team Leader)
const updateTeam = async (req, res, next) => {
  try {
    let team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }

    if (team.leader.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only the team leader can edit team details'
      });
    }

    if (req.body.skills && typeof req.body.skills === 'string') {
      req.body.skills = req.body.skills.split(',').map((s) => s.trim());
    }

    team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('leader members');

    res.status(200).json({
      success: true,
      message: 'Team updated successfully',
      data: team
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add member to team
// @route   POST /api/teams/:id/members
// @access  Private (Team Leader)
const addTeamMember = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }

    if (team.leader.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only team leader can add members'
      });
    }

    const userToAdd = await User.findById(userId);
    if (!userToAdd) {
      return res.status(404).json({
        success: false,
        message: 'User to add not found'
      });
    }

    if (team.members.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: 'User is already a member of this team'
      });
    }

    team.members.push(userId);
    await team.save();
    await team.populate('leader members');

    await createNotification({
      user: userId,
      title: 'Added to Team',
      message: `You have been added to the team "${team.name}" by ${req.user.name}.`,
      type: 'success'
    });

    res.status(200).json({
      success: true,
      message: 'Member added successfully',
      data: team
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove member from team
// @route   DELETE /api/teams/:id/members/:userId
// @access  Private (Team Leader / Member self-exit)
const removeTeamMember = async (req, res, next) => {
  try {
    const { id, userId } = req.params;
    const team = await Team.findById(id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }

    const isLeader = team.leader.toString() === req.user._id.toString();
    const isSelf = req.user._id.toString() === userId;

    if (!isLeader && !isSelf && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to remove this member'
      });
    }

    team.members = team.members.filter((m) => m.toString() !== userId);
    await team.save();

    res.status(200).json({
      success: true,
      message: 'Member removed successfully',
      data: team
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Invite user to team by email
// @route   POST /api/teams/:id/invite
// @access  Private
const inviteMember = async (req, res, next) => {
  try {
    const { email } = req.body;
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No registered user found with that email'
      });
    }

    if (team.members.includes(user._id)) {
      return res.status(400).json({
        success: false,
        message: 'User is already a member of this team'
      });
    }

    team.members.push(user._id);
    await team.save();

    await createNotification({
      user: user._id,
      title: 'Team Invitation',
      message: `You were invited and added to team "${team.name}".`,
      type: 'info'
    });

    res.status(200).json({
      success: true,
      message: `Successfully invited ${user.name} to the team`,
      data: team
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTeam,
  getTeams,
  getTeamById,
  updateTeam,
  addTeamMember,
  removeTeamMember,
  inviteMember
};
