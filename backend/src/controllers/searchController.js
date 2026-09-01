const Challenge = require('../models/Challenge');
const Solution = require('../models/Solution');
const Project = require('../models/Project');
const University = require('../models/University');
const IndustryPartner = require('../models/IndustryPartner');

// @desc    Global search across challenges, solutions, projects, universities, industry
// @route   GET /api/search
// @access  Public
const globalSearch = async (req, res, next) => {
  try {
    const { q = '' } = req.query;

    if (!q || q.trim().length === 0) {
      return res.status(200).json({
        success: true,
        message: 'Empty search query',
        data: {
          challenges: [],
          solutions: [],
          projects: [],
          universities: [],
          industry: []
        }
      });
    }

    const regex = new RegExp(q.trim(), 'i');

    const [challenges, solutions, projects, universities, industry] =
      await Promise.all([
        Challenge.find({
          $or: [
            { title: regex },
            { shortDescription: regex },
            { description: regex },
            { category: regex },
            { district: regex },
            { location: regex }
          ]
        })
          .populate('submittedBy', 'name role')
          .limit(10),

        Solution.find({
          $or: [
            { title: regex },
            { description: regex },
            { proposedTechnology: regex },
            { university: regex }
          ]
        })
          .populate('submittedBy', 'name role')
          .populate('challenge', 'title district')
          .limit(10),

        Project.find({
          $or: [
            { name: regex },
            { description: regex },
            { university: regex }
          ]
        })
          .populate('challenge', 'title category')
          .limit(10),

        University.find({
          $or: [
            { name: regex },
            { location: regex },
            { district: regex },
            { specializations: regex }
          ]
        }).limit(10),

        IndustryPartner.find({
          $or: [
            { name: regex },
            { industry: regex },
            { location: regex },
            { expertise: regex }
          ]
        }).limit(10)
      ]);

    res.status(200).json({
      success: true,
      message: `Found results for query "${q}"`,
      data: {
        challenges,
        solutions,
        projects,
        universities,
        industry
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  globalSearch
};
