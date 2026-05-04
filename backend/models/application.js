'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    static associate(models) {
      Application.belongsTo(models.User, { foreignKey: 'userId', as: 'applicant' });
      Application.belongsTo(models.Job, { foreignKey: 'jobId', as: 'job' });
    }
  }
  Application.init({
    userId: DataTypes.INTEGER,
    jobId: DataTypes.INTEGER,
    resumeUrl: DataTypes.STRING,
    coverLetter: DataTypes.TEXT,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'applied' // applied, reviewing, interviewed, rejected, accepted
    }
  }, {
    sequelize,
    modelName: 'Application',
  });
  return Application;
};
