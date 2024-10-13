const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/index');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(`:::::::::::::::::::  username:::::::::::::::::::`, username);

    // Check if the user already exists by email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(409).json({ message: "User with this email already exists" });

    let user = await User.create({ username, email, password });

    user = JSON.parse(JSON.stringify(user));
    delete user.password;

    const token = jwt.sign(user, process.env.JWT_SECRET);

    res.status(201).json({ message: 'User registered successfully', data: { user, token } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found with email' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Invalid password' });

    user = JSON.parse(JSON.stringify(user));
    delete user.password;

    const token = jwt.sign(user, process.env.JWT_SECRET);
    res.status(200).json({ message: 'User logged in successfully', data: { user, token } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
