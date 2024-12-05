const { ErrorHelper, ctrlWrapper } = require("../helpers");
const { Money } = require("../models/moneySchema");

const getAllEarnings = async (req, res, next) => {
  const { id } = req.user;

  const earnings = await Money.find({ owner: id, type: "earnings" });

  if (!earnings) next(ErrorHelper(404));

  res.status(200).json(earnings);
};

const addEarnings = async (req, res, next) => {
  const { id: owner } = req.user;
  const { title, date, price, type } = req.body;

  const newEarnings = {
    title,
    date,
    price,

    owner,
    type,
  };

  const newEarning = await Money.create(newEarnings);

  res.status(201).json(newEarning);
};

const updateEarnings = async (req, res, next) => {
  const { id: owner } = req.user;
  const { earningsId } = req.params;
  const { title, date, price } = req.body;

  const isEarnings = await Money.findOne({ owner, _id: earningsId });

  if (!isEarnings) next(ErrorHelper(404));

  const newUpdatedEarnings = {
    title,
    date,
    price,

    owner,
    type: isEarnings.type,
  };

  const updEarning = await Money.findByIdAndUpdate(
    earningsId,
    newUpdatedEarnings
  );

  res.status(200).json(updEarning);
};

const removeEarnings = async (req, res, next) => {
  const { id: owner } = req.user;
  const { earningsId } = req.params;

  const isEarnings = await Money.findOne({ owner, _id: earningsId });

  if (!isEarnings) next(ErrorHelper(404));

  await Money.findByIdAndDelete(earningsId);

  res.status(200).json(isEarnings);
};

module.exports = {
  getAllEarnings: ctrlWrapper(getAllEarnings),
  addEarnings: ctrlWrapper(addEarnings),
  updateEarnings: ctrlWrapper(updateEarnings),
  removeEarnings: ctrlWrapper(removeEarnings),
};
