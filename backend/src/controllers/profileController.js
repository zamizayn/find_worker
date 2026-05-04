const { Profile, User, Experience, Education } = require('../../models');

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      where: { userId: req.params.userId || req.user.id },
      include: [
        { model: User, as: 'user', attributes: ['email'] },
        { model: Experience, as: 'experiences' },
        { model: Education, as: 'education' }
      ]
    });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, headline, bio, location } = req.body;
    let profile = await Profile.findOne({ where: { userId: req.user.id } });

    if (!profile) {
      profile = await Profile.create({ userId: req.user.id });
    }

    const updateData = { firstName, lastName, headline, bio, location };
    
    if (req.file) {
      const imageUrl = `/uploads/images/${req.file.filename}`;
      if (req.body.type === 'avatar') {
        updateData.avatarUrl = imageUrl;
      } else if (req.body.type === 'cover') {
        updateData.coverUrl = imageUrl;
      }
    }

    await profile.update(updateData);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
