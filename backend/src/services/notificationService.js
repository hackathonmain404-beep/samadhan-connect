const Notification = require('../models/Notification');

/**
 * Creates an in-app notification for a user
 * @param {Object} options
 * @param {string} options.user - User ID
 * @param {string} options.title - Notification title
 * @param {string} options.message - Notification message
 * @param {string} [options.type='info'] - 'info' | 'success' | 'warning' | 'alert'
 * @param {string} [options.relatedChallenge]
 * @param {string} [options.relatedSolution]
 * @param {string} [options.relatedProject]
 */
const createNotification = async ({
  user,
  title,
  message,
  type = 'info',
  relatedChallenge = null,
  relatedSolution = null,
  relatedProject = null
}) => {
  try {
    if (!user) return null;
    const notification = await Notification.create({
      user,
      title,
      message,
      type,
      relatedChallenge,
      relatedSolution,
      relatedProject
    });
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error.message);
    return null;
  }
};

module.exports = {
  createNotification
};
