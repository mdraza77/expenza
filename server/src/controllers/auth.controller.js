const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ email }, { name }],
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  const jwt_token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.cookie("jwt_token", jwt_token);

  res.status(201).json({
    message: "User registered successfully",
    jwt_token: jwt_token,
    user: {
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
    },
  });
};

module.exports = { registerController };
