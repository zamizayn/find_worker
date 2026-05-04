const { Post, User, Profile, Like, Comment, Connection } = require('../../models');
const { Op } = require('sequelize');

exports.createPost = async (req, res) => {
  try {
    const { content, mediaUrl } = req.body;
    const post = await Post.create({
      authorId: req.user.id,
      content,
      mediaUrl
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFeed = async (req, res) => {
  try {
    // Get user's connections to filter feed (optional, for simple LinkedIn style)
    const connections = await Connection.findAll({
      where: {
        [Op.or]: [
          { requesterId: req.user.id, status: 'accepted' },
          { addresseeId: req.user.id, status: 'accepted' }
        ]
      }
    });

    const connectionIds = connections.map(c => 
      c.requesterId === req.user.id ? c.addresseeId : c.requesterId
    );
    
    // Include the user's own posts
    connectionIds.push(req.user.id);

    const posts = await Post.findAll({
      where: { authorId: { [Op.in]: connectionIds } },
      include: [
        { 
          model: User, 
          as: 'author', 
          attributes: ['email'],
          include: [{ model: Profile, as: 'profile', attributes: ['firstName', 'lastName', 'avatarUrl', 'headline'] }]
        },
        { 
          model: Comment, 
          as: 'comments',
          include: [{ model: User, as: 'author', attributes: ['email'] }]
        },
        { model: Like, as: 'likes' }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const [like, created] = await Like.findOrCreate({
      where: { 
        userId: req.user.id, 
        targetId: postId,
        targetType: 'post'
      }
    });

    if (!created) {
      await like.destroy();
      return res.json({ message: 'Post unliked' });
    }

    res.status(201).json(like);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.commentPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const comment = await Comment.create({
      authorId: req.user.id,
      postId,
      content
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
