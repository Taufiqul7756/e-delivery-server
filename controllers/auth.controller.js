const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register user
exports.register = async (req, res) => {
  try {
    const { stdId, name, email, hallName, password, description, role } =
      req.body;
    const user = new User({
      stdId,
      name,
      email,
      hallName,
      password,
      description,
      role,
    });
    await user.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid email or password");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Exclude sensitive information like password before sending user info
    const { password: userPassword, ...userInfo } = user.toObject();

    res.json({ token, user: userInfo });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
