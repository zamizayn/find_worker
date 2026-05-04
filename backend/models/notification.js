'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      Notification.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  Notification.init({
    userId: DataTypes.INTEGER,
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }, // connection_request, message, like, comment, job_update
    data: DataTypes.JSONB, // Details for the notification (IDs, small snippets)
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};
