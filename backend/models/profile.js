'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Profile.hasMany(models.Experience, { foreignKey: 'profileId', as: 'experiences' });
      Profile.hasMany(models.Education, { foreignKey: 'profileId', as: 'education' });
    }
  }
  Profile.init({
    userId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    headline: DataTypes.STRING,
    bio: DataTypes.TEXT,
    avatarUrl: DataTypes.STRING,
    coverUrl: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};