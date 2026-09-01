const express = require('express');
const { body } = require('express-validator');
const {
  sendMessage,
  getConversations,
  getChatHistory,
  markMessageAsRead
} = require('../controllers/messageController');
const { requireAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

const router = express.Router();

router.use(requireAuth);

const messageValidation = [
  body('receiverId').notEmpty().withMessage('Receiver ID is required'),
  body('message').trim().notEmpty().withMessage('Message content is required')
];

router
  .route('/')
  .get(getConversations)
  .post(messageValidation, validate, sendMessage);

router.get('/:userId', getChatHistory);
router.patch('/:id/read', markMessageAsRead);

module.exports = router;
