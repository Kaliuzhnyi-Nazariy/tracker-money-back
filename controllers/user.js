const { ErrorHelper, ctrlWrapper } = require("../helpers");
const { User } = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword)
    next(ErrorHelper(400, "Passwords do not match!"));

  const isUser = await User.find({ email });

  if (!isUser) next(ErrorHelper(409, "This email is already in use!"));
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword,
  });

  res.status(201).json({ id: newUser._id, email: newUser.email });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) next(ErrorHelper(400, "Wrong email or password!"));

  const comparePasswords = await bcrypt.compare(password, user.password);

  if (!comparePasswords) next(ErrorHelper(400, "Wrong email or password!"));

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token: token });

  res.status(200).json({ email: user.email, password: user.password, token });
};

const logout = async (req, res, next) => {
  const { id } = req.user;

  const isUser = await User.findById(id);

  if (!isUser) next(ErrorHelper(400));

  await User.findByIdAndUpdate(id, { token: "" });

  res.status(204).json();
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
};
