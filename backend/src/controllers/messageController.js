const { Message, User, Profile } = require('../../models');
const { Op } = require('sequelize');

exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    const senderId = req.user.id;

    const message = await Message.create({
      senderId,
      receiverId,
      content
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const userId = req.user.id;
    const { contactId } = req.params;

    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: userId, receiverId: contactId },
          { senderId: contactId, receiverId: userId }
        ]
      },
      order: [['createdAt', 'ASC']]
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getConversationList = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // This is a simplified way to get conversation partners.
    // In a real app, you might want a distinct query or a separate Conversation model.
    const messages = await Message.findAll({
      where: {
        [Op.or]: [{ senderId: userId }, { receiverId: userId }]
      },
      attributes: ['senderId', 'receiverId'],
      order: [['createdAt', 'DESC']]
    });

    const contactIds = new Set();
    messages.forEach(m => {
      if (m.senderId !== userId) contactIds.add(m.senderId);
      if (m.receiverId !== userId) contactIds.add(m.receiverId);
    });

    const profiles = await Profile.findAll({
      where: { userId: Array.from(contactIds) },
      attributes: ['userId', 'firstName', 'lastName', 'avatarUrl', 'headline']
    });

    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
