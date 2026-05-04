const { Connection, User, Profile } = require('../../models');
const { Op } = require('sequelize');

exports.sendRequest = async (req, res) => {
  try {
    const { recipientId } = req.body;
    const requesterId = req.user.id;

    if (requesterId == recipientId) {
      return res.status(400).json({ message: 'Cannot connect with yourself' });
    }

    const existingConnection = await Connection.findOne({
      where: {
        [Op.or]: [
          { requesterId, recipientId },
          { requesterId: recipientId, recipientId: requesterId }
        ]
      }
    });

    if (existingConnection) {
      return res.status(400).json({ message: 'Connection already exists or pending' });
    }

    const connection = await Connection.create({
      requesterId,
      recipientId,
      status: 'pending'
    });

    res.status(201).json(connection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.respondToRequest = async (req, res) => {
  try {
    const { connectionId, status } = req.body; // status: 'accepted' or 'rejected'
    const recipientId = req.user.id;

    const connection = await Connection.findOne({
      where: { id: connectionId, recipientId, status: 'pending' }
    });

    if (!connection) {
      return res.status(404).json({ message: 'Pending request not found' });
    }

    await connection.update({ status });
    res.json(connection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getConnections = async (req, res) => {
  try {
    const userId = req.user.id;
    const connections = await Connection.findAll({
      where: {
        status: 'accepted',
        [Op.or]: [{ requesterId: userId }, { recipientId: userId }]
      },
      include: [
        { model: User, as: 'requester', include: [{ model: Profile, as: 'profile' }] },
        { model: User, as: 'recipient', include: [{ model: Profile, as: 'profile' }] }
      ]
    });

    res.json(connections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
