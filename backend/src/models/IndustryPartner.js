const mongoose = require('mongoose');

const industryPartnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the industry partner name'],
      unique: true,
      trim: true,
      maxlength: [150, 'Name cannot exceed 150 characters']
    },
    industry: {
      type: String,
      required: [true, 'Please specify the industry sector (e.g. Steel, Mining, Tech, Manufacturing)'],
      trim: true
    },
    location: {
      type: String,
      required: [true, 'Please provide company location / plant address'],
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    expertise: {
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
    projectsMentored: {
      type: Number,
      default: 0
    },
    projectsSponsored: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

industryPartnerSchema.index({ name: 'text', industry: 'text', expertise: 'text' });

module.exports = mongoose.model('IndustryPartner', industryPartnerSchema);
