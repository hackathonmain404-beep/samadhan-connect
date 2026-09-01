const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    challenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Challenge',
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Prevent duplicate upvotes from the same user for a challenge
supportSchema.index({ user: 1, challenge: 1 }, { unique: true });

module.exports = mongoose.model('Support', supportSchema);
