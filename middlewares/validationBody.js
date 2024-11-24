const { ErrorHelper } = require("../helpers");

const validationBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(ErrorHelper(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validationBody;
