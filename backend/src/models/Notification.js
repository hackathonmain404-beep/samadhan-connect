const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Recipient user is required']
    },
    title: {
      type: String,
      required: [true, 'Notification title is required'],
      trim: true
    },
    message: {
      type: String,
      required: [true, 'Notification message is required']
    },
    type: {
      type: String,
      enum: ['info', 'success', 'warning', 'alert'],
      default: 'info'
    },
    read: {
      type: Boolean,
      default: false
    },
    relatedChallenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Challenge',
      default: null
    },
    relatedSolution: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Solution',
      default: null
    },
    relatedProject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Notification', notificationSchema);
