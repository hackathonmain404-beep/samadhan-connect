const mongoose = require('mongoose');

const projectUpdateSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Associated project is required']
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required']
    },
    title: {
      type: String,
      required: [true, 'Update title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Update description is required']
    },
    attachments: [
      {
        url: { type: String, required: true },
        fileType: { type: String, default: 'image' },
        originalName: { type: String, default: '' }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('ProjectUpdate', projectUpdateSchema);
