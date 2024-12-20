const { ErrorHelper, ctrlWrapper } = require("../helpers");
const { Money } = require("../models/moneySchema");

const resetAll = async (req, res, next) => {
  const { ownerId: owner } = req.body;

  const allMoney = await Money.find({ owner });

  if (allMoney.length === 0) res.status(200).json({ message: "List is empty" });

  //   await Money.remove([owner], function (err) {
  //     if (!err) {
  //       res.status(204);
  //     } else {
  //       ErrorHelper(400, err);
  //     }
  //   });

  await Money.deleteMany({ owner });

  res.status(204).json();
};

module.exports = { resetAll: ctrlWrapper(resetAll) };
