const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a team name'],
      trim: true,
      maxlength: [100, 'Team name cannot exceed 100 characters']
    },
    leader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Team leader is required']
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    university: {
      type: String,
      default: ''
    },
    skills: {
      type: [String],
      default: []
    },
    currentChallenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Challenge',
      default: null
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
      }
    ]
  },
  {
    timestamps: true
  }
);

teamSchema.index({ name: 'text', skills: 'text' });

module.exports = mongoose.model('Team', teamSchema);
