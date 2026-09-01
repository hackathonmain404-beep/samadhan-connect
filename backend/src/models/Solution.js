const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a solution proposal title'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    challenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Challenge',
      required: [true, 'Please associate this solution with a challenge']
    },
    description: {
      type: String,
      required: [true, 'Please provide a detailed description of the solution']
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
    proposedTechnology: {
      type: [String],
      default: []
    },
    implementationPlan: {
      type: String,
      required: [true, 'Please outline an implementation plan']
    },
    expectedImpact: {
      type: String,
      required: [true, 'Please describe the expected impact']
    },
    estimatedDuration: {
      type: String,
      default: '3 months'
    },
    requiredResources: {
      type: String,
      default: ''
    },
    industrySupportRequired: {
      type: Boolean,
      default: false
    },
    documents: [
      {
        url: { type: String, required: true },
        fileType: { type: String, default: 'document' },
        originalName: { type: String, default: '' }
      }
    ],
    status: {
      type: String,
      enum: [
        'submitted',
        'under_review',
        'shortlisted',
        'approved',
        'rejected',
        'completed'
      ],
      default: 'submitted'
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    feedback: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

solutionSchema.index({ title: 'text', description: 'text', proposedTechnology: 'text' });

module.exports = mongoose.model('Solution', solutionSchema);
