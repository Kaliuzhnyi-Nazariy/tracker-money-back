const { Schema, model, ModifiedPathsSnapshot } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: "",
  },
  changePasswordToken: {
    type: String,
    default: "",
  },
});

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

const regValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email":
      "Enter email please (use @gmail.com / @yahoo.com for example)",
    "string.empty": "Enter email please",
  }),
  password: Joi.string()
    .min(8)
    .max(16)
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must not exceed 16 characters",
      "string.pattern.base":
        "Password must include at least one uppercase letter, one lowercase letter, and one number",
    }),
  confirmPassword: Joi.string()
    .min(8)
    .max(16)
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must not exceed 16 characters",
      "string.pattern.base":
        "Password must include at least one uppercase letter, one lowercase letter, and one number",
    }),
});

const loginValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email":
      "Enter email please (use @gmail.com / @yahoo.com for example)",
    "string.empty": "Enter email please",
  }),
  password: Joi.string()
    .min(8)
    .max(16)
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must not exceed 16 characters",
      "string.pattern.base":
        "Password must include at least one uppercase letter, one lowercase letter, and one number",
    }),
});

const schemas = {
  regValidation,
  loginValidation,
};

module.exports = { User, schemas };
