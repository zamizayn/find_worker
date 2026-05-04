const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, Profile } = require('../../models');

exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ 
      email, 
      password: hashedPassword,
      role: role || 1 // Default to 1 (CANDIDATE)
    });

    await Profile.create({
      userId: user.id,
      firstName,
      lastName
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
 
    res.status(201).json({ 
      token, 
      user: { 
        id: user.id, 
        email: user.email,
        role: user.role
      } 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ 
      token, 
      user: { 
        id: user.id, 
        email: user.email,
        role: user.role
      } 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
