const University = require('../models/University');
const Project = require('../models/Project');
const Team = require('../models/Team');

// @desc    Get all universities
// @route   GET /api/universities
// @access  Public
const getUniversities = async (req, res, next) => {
  try {
    const { district, search, page = 1, limit = 10 } = req.query;
    const query = {};

    if (district) query.district = new RegExp(district, 'i');
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { specializations: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await University.countDocuments(query);
    const universities = await University.find(query)
      .sort({ name: 1 })
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      message: 'Universities retrieved successfully',
      count: universities.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: universities
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get university details
// @route   GET /api/universities/:id
// @access  Public
const getUniversityById = async (req, res, next) => {
  try {
    const university = await University.findById(req.params.id);

    if (!university) {
      return res.status(404).json({
        success: false,
        message: 'University not found'
      });
    }

    // Associated projects and teams
    const projects = await Project.find({ university: university.name })
      .populate('challenge', 'title category')
      .select('name status progress startDate');

    const teams = await Team.find({ university: university.name })
      .populate('leader', 'name email')
      .select('name skills members');

    res.status(200).json({
      success: true,
      message: 'University details retrieved successfully',
      data: {
        ...university.toObject(),
        projects,
        teams
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create university profile
// @route   POST /api/universities
// @access  Private (Admin / University rep)
const createUniversity = async (req, res, next) => {
  try {
    const {
      name,
      location,
      district,
      description,
      specializations,
      website,
      logo,
      researchers,
      studentTeams
    } = req.body;

    const specArray = Array.isArray(specializations)
      ? specializations
      : typeof specializations === 'string'
      ? specializations.split(',').map((s) => s.trim())
      : [];

    const university = await University.create({
      name,
      location,
      district,
      description: description || '',
      specializations: specArray,
      website: website || '',
      logo: logo || '',
      researchers: researchers || 0,
      studentTeams: studentTeams || 0
    });

    res.status(201).json({
      success: true,
      message: 'University profile created successfully',
      data: university
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update university
// @route   PUT /api/universities/:id
// @access  Private (Admin / University rep)
const updateUniversity = async (req, res, next) => {
  try {
    if (req.body.specializations && typeof req.body.specializations === 'string') {
      req.body.specializations = req.body.specializations.split(',').map((s) => s.trim());
    }

    const university = await University.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!university) {
      return res.status(404).json({
        success: false,
        message: 'University not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'University updated successfully',
      data: university
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUniversities,
  getUniversityById,
  createUniversity,
  updateUniversity
};
