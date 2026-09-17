const ChatMessage = require('../models/chat-message');

const getMessages = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const messages = await ChatMessage.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    return res.status(200).json(messages.reverse());
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createMessage = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const text = typeof req.body?.text === 'string' ? req.body.text.trim() : '';
  if (!text || text.length > 500) {
    return res.status(400).json({ message: 'Text must be between 1 and 500 characters' });
  }

  try {
    const message = await ChatMessage.create({
      sender: req.user.id,
      username: req.user.username,
      text,
    });

    return res.status(201).json(message);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getMessages, createMessage };