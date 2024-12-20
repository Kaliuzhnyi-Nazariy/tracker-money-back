const express = require("express");
const { authenticate, validationBody } = require("../middlewares/");
const ctr = require("../controllers/expensesOperations");
const ctrl = require("../controllers/earningsOperations");
const { resetAll } = require("../controllers/removeAllMoney");
const { makeOperationsValidation } = require("../models/moneySchema");

const router = express.Router();

router.get("/allExpenses", authenticate, ctr.getAllExpenses);

router.post(
  "/newExpenses",
  authenticate,
  validationBody(makeOperationsValidation),
  ctr.addExpenses
);

router.put(
  "/expenses/:expensesId",
  authenticate,
  validationBody(makeOperationsValidation),
  ctr.updateExpenses
);

router.delete("/expenses/remove/:expensesId", authenticate, ctr.removeExpenses);

router.get("/allEarnings", authenticate, ctrl.getAllEarnings);

router.post(
  "/newEarnings",
  authenticate,
  validationBody(makeOperationsValidation),
  ctrl.addEarnings
);

router.put(
  "/earnings/:earningsId",
  authenticate,
  validationBody(makeOperationsValidation),
  ctrl.updateEarnings
);

router.delete(
  "/earnings/remove/:earningsId",
  authenticate,
  ctrl.removeEarnings
);

router.delete("/resetAll", authenticate, resetAll);

module.exports = router;
