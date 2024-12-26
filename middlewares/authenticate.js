const { ErrorHelper, isTokenExpired } = require("../helpers");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userSchema");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") next(ErrorHelper(401));

  try {
    const isNotValid = isTokenExpired(token);

    if (isNotValid.isExpired) {
      await User.findByIdAndUpdate(isNotValid.id, { token: "" });
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch (error) {
    next(ErrorHelper(401));
  }
};

module.exports = authenticate;
