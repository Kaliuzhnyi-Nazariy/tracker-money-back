const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const typeEnum = ["expenses", "earnings"];
const categoryEnum = ["food", "health", "needs", "others"];

const moneySchema = new Schema({
  title: {
    type: String,
    required: true,
    default: "",
  },
  type: {
    type: String,
    enum: typeEnum,
  },
  date: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: categoryEnum,
    default: "others",
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

moneySchema.post("save", handleMongooseError);

const Money = model("money", moneySchema);

const makeOperationsValidation = Joi.object({
  title: Joi.string().min(3).max(50).trim().required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 3 characters long",
    "string.max": "Title cannot exceed 50 characters",
  }),

  type: Joi.string().valid(...typeEnum),

  date: Joi.string()
    .pattern(/^\d{2}-\d{2}-\d{4}$/)
    .required()
    .messages({
      "string.empty": "Date is required",
      "string.pattern.base": "Date must be in YYYY-MM-DD format",
    }),

  price: Joi.number().min(0).required().messages({
    "number.base": "Price must be a number",
    "number.min": "Price must be a positive number",
    "any.required": "Price is required",
  }),

  category: Joi.string()
    .valid(...categoryEnum)
    .default("others")
    .messages({
      "any.only": `Category must be one of: ${categoryEnum.join(", ")}`,
    }),

  owner: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/) // Validates MongoDB ObjectId
    .required()
    .messages({
      "string.pattern.base": "Owner must be a valid MongoDB ObjectId",
      "string.empty": "Owner is required",
    }),
});

module.exports = { Money, makeOperationsValidation };
