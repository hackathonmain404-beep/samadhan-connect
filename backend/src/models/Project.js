const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a project name'],
      trim: true,
      maxlength: [200, 'Project name cannot exceed 200 characters']
    },
    challenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Challenge',
      required: [true, 'Associated challenge is required']
    },
    solution: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Solution',
      required: [true, 'Associated solution proposal is required']
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      default: null
    },
    university: {
      type: String,
      default: ''
    },
    industryMentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    governmentCoordinator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    status: {
      type: String,
      enum: ['research', 'prototype', 'testing', 'implementation', 'completed'],
      default: 'research'
    },
    progress: {
      type: Number,
      min: [0, 'Progress cannot be less than 0%'],
      max: [100, 'Progress cannot exceed 100%'],
      default: 0
    },
    description: {
      type: String,
      required: [true, 'Please provide a project summary/description']
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    expectedCompletionDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

projectSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Project', projectSchema);
