'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    static associate(models) {
      Job.belongsTo(models.User, { foreignKey: 'authorId', as: 'recruiter' });
      Job.hasMany(models.Application, { foreignKey: 'jobId', as: 'applications' });
    }
  }
  Job.init({
    authorId: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: DataTypes.STRING,
    description: DataTypes.TEXT,
    requirements: DataTypes.TEXT,
    salaryRange: DataTypes.STRING,
    jobType: DataTypes.STRING, // e.g., Full-time, Remote, etc.
    status: {
      type: DataTypes.STRING,
      defaultValue: 'open'
    }
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};
