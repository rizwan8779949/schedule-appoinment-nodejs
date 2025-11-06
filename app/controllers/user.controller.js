const db = require("../models");
const User = db.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/project.config");

// Create a new user
exports.create = async (req, res) => {
  try {
    const { username, password, name } = req.body;

    // Validation
    if (!username || !password || !name) {
      return res.status(400).json({ message: "Username, password, or name missing" });
    }

    // Check if user already exists
    const userExist = await User.findOne({ username });
    if (userExist) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      name,
      username,
      password: hashedPassword,
      status: 0,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username or password cannot be empty!" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User does not exist!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      config.tokenScretKey,
      { expiresIn: "1h" } // Optional: add token expiry
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        status: user.status,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
