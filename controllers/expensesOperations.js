const { ErrorHelper, ctrlWrapper } = require("../helpers");
const { Money } = require("../models/moneySchema");

const getAllExpenses = async (req, res, next) => {
  const { id } = req.user;

  const expenses = await Money.find({ owner: id, type: "expenses" });

  if (!expenses) next(ErrorHelper(404));

  res.status(200).json(expenses);
};

const addExpenses = async (req, res, next) => {
  const { id: owner } = req.user;
  const { title, date, price, category, type } = req.body;

  const newExpenses = {
    title,
    date,
    price,
    category,
    owner,
    type,
  };

  const newExpense = await Money.create(newExpenses);

  res.status(201).json(newExpense);
};

const updateExpenses = async (req, res, next) => {
  const { id: owner } = req.user;
  const { expensesId } = req.params;
  const { title, date, price, category } = req.body;

  const isExpense = await Money.findOne({ owner, _id: expensesId });

  if (!isExpense) next(ErrorHelper(404));

  const newUpdatedExpenses = {
    title,
    date,
    price,
    category,
    owner,
    type: isExpense.type,
  };

  const updated = await Money.findByIdAndUpdate(
    expensesId,
    newUpdatedExpenses,
    { new: true }
  );

  res.status(200).json(updated);
};

const removeExpenses = async (req, res, next) => {
  const { id: owner } = req.user;
  const { expensesId } = req.params;

  const isExpense = await Money.findOne({ owner, _id: expensesId });

  if (!isExpense) next(ErrorHelper(404));

  await Money.findByIdAndDelete(expensesId);

  res.status(200).json(isExpense);
};

module.exports = {
  getAllExpenses: ctrlWrapper(getAllExpenses),
  addExpenses: ctrlWrapper(addExpenses),
  updateExpenses: ctrlWrapper(updateExpenses),
  removeExpenses: ctrlWrapper(removeExpenses),
};
