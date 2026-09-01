const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a challenge title'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    shortDescription: {
      type: String,
      required: [true, 'Please provide a short description'],
      trim: true,
      maxlength: [500, 'Short description cannot exceed 500 characters']
    },
    description: {
      type: String,
      required: [true, 'Please provide a full description']
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: {
        values: [
          'Education',
          'Healthcare',
          'Agriculture',
          'Water Management',
          'Sanitation',
          'Environment',
          'Rural Livelihood',
          'Accessibility',
          'Urban Infrastructure',
          'Public Services'
        ],
        message: '{VALUE} is not a valid category'
      }
    },
    location: {
      type: String,
      required: [true, 'Please specify the exact location/village/ward'],
      trim: true
    },
    district: {
      type: String,
      required: [true, 'Please specify the Jharkhand district'],
      trim: true
    },
    state: {
      type: String,
      default: 'Jharkhand'
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    urgency: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium'
    },
    status: {
      type: String,
      enum: [
        'pending',
        'under_review',
        'verified',
        'open',
        'in_progress',
        'resolved',
        'rejected'
      ],
      default: 'pending'
    },
    affectedPeople: {
      type: String,
      default: '100+'
    },
    duration: {
      type: String,
      default: ''
    },
    expectedOutcome: {
      type: String,
      default: ''
    },
    evidence: [
      {
        url: { type: String, required: true },
        fileType: { type: String, default: 'image' },
        originalName: { type: String, default: '' }
      }
    ],
    supportCount: {
      type: Number,
      default: 0
    },
    teamCount: {
      type: Number,
      default: 0
    },
    solutionCount: {
      type: Number,
      default: 0
    },
    rejectionReason: {
      type: String,
      default: ''
    },
    requestedInfo: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

// Text index for search
challengeSchema.index({
  title: 'text',
  shortDescription: 'text',
  description: 'text',
  location: 'text',
  district: 'text'
});

module.exports = mongoose.model('Challenge', challengeSchema);
