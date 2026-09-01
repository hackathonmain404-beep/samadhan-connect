const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the university name'],
      unique: true,
      trim: true,
      maxlength: [150, 'University name cannot exceed 150 characters']
    },
    location: {
      type: String,
      required: [true, 'Please provide university location/campus'],
      trim: true
    },
    district: {
      type: String,
      required: [true, 'Please provide Jharkhand district'],
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    specializations: {
      type: [String],
      default: []
    },
    website: {
      type: String,
      default: ''
    },
    logo: {
      type: String,
      default: ''
    },
    researchers: {
      type: Number,
      default: 0
    },
    studentTeams: {
      type: Number,
      default: 0
    },
    activeProjects: {
      type: Number,
      default: 0
    },
    completedProjects: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

universitySchema.index({ name: 'text', district: 'text', specializations: 'text' });

module.exports = mongoose.model('University', universitySchema);
