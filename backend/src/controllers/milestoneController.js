const Milestone = require('../models/Milestone');

// @desc    Update a milestone
// @route   PUT /api/milestones/:id
// @access  Private
const updateMilestone = async (req, res, next) => {
  try {
    const { title, description, status, dueDate } = req.body;

    let milestone = await Milestone.findById(req.params.id);
    if (!milestone) {
      return res.status(404).json({
        success: false,
        message: 'Milestone not found'
      });
    }

    if (title) milestone.title = title;
    if (description !== undefined) milestone.description = description;
    if (dueDate) milestone.dueDate = dueDate;
    if (status) {
      milestone.status = status;
      if (status === 'completed' && !milestone.completedAt) {
        milestone.completedAt = new Date();
      }
    }

    await milestone.save();

    res.status(200).json({
      success: true,
      message: 'Milestone updated successfully',
      data: milestone
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a milestone
// @route   DELETE /api/milestones/:id
// @access  Private
const deleteMilestone = async (req, res, next) => {
  try {
    const milestone = await Milestone.findByIdAndDelete(req.params.id);
    if (!milestone) {
      return res.status(404).json({
        success: false,
        message: 'Milestone not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Milestone deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateMilestone,
  deleteMilestone
};
