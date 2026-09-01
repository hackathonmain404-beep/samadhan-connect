const Message = require('../models/Message');
const User = require('../models/User');

// @desc    Send a direct message
// @route   POST /api/messages
// @access  Private
const sendMessage = async (req, res, next) => {
  try {
    const { receiverId, message } = req.body;

    if (!receiverId || !message) {
      return res.status(400).json({
        success: false,
        message: 'Receiver ID and message content are required'
      });
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: 'Recipient user not found'
      });
    }

    const newMessage = await Message.create({
      sender: req.user._id,
      receiver: receiverId,
      message
    });

    await newMessage.populate([
      { path: 'sender', select: 'name email role profileImage' },
      { path: 'receiver', select: 'name email role profileImage' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: newMessage
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get recent conversations / messages for the logged in user
// @route   GET /api/messages
// @access  Private
const getConversations = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Find all messages where user is sender or receiver
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }]
    })
      .populate('sender', 'name email role profileImage')
      .populate('receiver', 'name email role profileImage')
      .sort({ createdAt: -1 });

    // Group by contact user
    const contactsMap = new Map();
    messages.forEach((msg) => {
      const isSender = msg.sender._id.toString() === userId.toString();
      const contactUser = isSender ? msg.receiver : msg.sender;
      if (!contactUser) return;

      const contactId = contactUser._id.toString();
      if (!contactsMap.has(contactId)) {
        contactsMap.set(contactId, {
          contact: contactUser,
          lastMessage: msg,
          unreadCount: !isSender && !msg.read ? 1 : 0
        });
      } else {
        if (!isSender && !msg.read) {
          contactsMap.get(contactId).unreadCount += 1;
        }
      }
    });

    const conversations = Array.from(contactsMap.values());

    res.status(200).json({
      success: true,
      message: 'Conversations retrieved successfully',
      count: conversations.length,
      data: conversations
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get chat history with a specific user
// @route   GET /api/messages/:userId
// @access  Private
const getChatHistory = async (req, res, next) => {
  try {
    const currentUserId = req.user._id;
    const targetUserId = req.params.userId;

    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: targetUserId },
        { sender: targetUserId, receiver: currentUserId }
      ]
    })
      .populate('sender', 'name email role profileImage')
      .populate('receiver', 'name email role profileImage')
      .sort({ createdAt: 1 });

    // Mark received unread messages as read
    await Message.updateMany(
      { sender: targetUserId, receiver: currentUserId, read: false },
      { read: true }
    );

    res.status(200).json({
      success: true,
      message: 'Chat history retrieved successfully',
      count: messages.length,
      data: messages
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark a message as read
// @route   PATCH /api/messages/:id/read
// @access  Private
const markMessageAsRead = async (req, res, next) => {
  try {
    const message = await Message.findOneAndUpdate(
      { _id: req.params.id, receiver: req.user._id },
      { read: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found or not addressed to you'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Message marked as read',
      data: message
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendMessage,
  getConversations,
  getChatHistory,
  markMessageAsRead
};
