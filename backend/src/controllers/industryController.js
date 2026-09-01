const IndustryPartner = require('../models/IndustryPartner');
const Project = require('../models/Project');

// @desc    Get all industry partners
// @route   GET /api/industry
// @access  Public
const getIndustry = async (req, res, next) => {
  try {
    const { industry, search, page = 1, limit = 10 } = req.query;
    const query = {};

    if (industry) query.industry = new RegExp(industry, 'i');
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { industry: { $regex: search, $options: 'i' } },
        { expertise: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await IndustryPartner.countDocuments(query);
    const partners = await IndustryPartner.find(query)
      .sort({ name: 1 })
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      message: 'Industry partners retrieved successfully',
      count: partners.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: partners
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get industry partner details
// @route   GET /api/industry/:id
// @access  Public
const getIndustryById = async (req, res, next) => {
  try {
    const partner = await IndustryPartner.findById(req.params.id);

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: 'Industry partner not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Industry partner details retrieved successfully',
      data: partner
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create industry partner profile
// @route   POST /api/industry
// @access  Private (Admin / Industry rep)
const createIndustry = async (req, res, next) => {
  try {
    const {
      name,
      industry,
      location,
      description,
      expertise,
      website,
      logo,
      projectsMentored,
      projectsSponsored
    } = req.body;

    const expArray = Array.isArray(expertise)
      ? expertise
      : typeof expertise === 'string'
      ? expertise.split(',').map((e) => e.trim())
      : [];

    const partner = await IndustryPartner.create({
      name,
      industry,
      location,
      description: description || '',
      expertise: expArray,
      website: website || '',
      logo: logo || '',
      projectsMentored: projectsMentored || 0,
      projectsSponsored: projectsSponsored || 0
    });

    res.status(201).json({
      success: true,
      message: 'Industry partner registered successfully',
      data: partner
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update industry partner
// @route   PUT /api/industry/:id
// @access  Private (Admin / Industry rep)
const updateIndustry = async (req, res, next) => {
  try {
    if (req.body.expertise && typeof req.body.expertise === 'string') {
      req.body.expertise = req.body.expertise.split(',').map((e) => e.trim());
    }

    const partner = await IndustryPartner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: 'Industry partner not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Industry partner updated successfully',
      data: partner
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getIndustry,
  getIndustryById,
  createIndustry,
  updateIndustry
};
