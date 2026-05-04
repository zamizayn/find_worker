'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: 'authorId', as: 'author' });
      Post.hasMany(models.Comment, { foreignKey: 'postId', as: 'comments' });
      Post.hasMany(models.Like, { foreignKey: 'targetId', constraints: false, scope: { targetType: 'post' }, as: 'likes' });
    }
  }
  Post.init({
    authorId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    mediaUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};