const express = require("express");
const expenseController = require("../controllers/expense.controller");
const identifyUser = require("../middlewares/auth.middleware");

const expenseRouter = express.Router();

expenseRouter.post(
  "/",
  identifyUser,
  expenseController.createExpenseController,
);

expenseRouter.get(
  "/group/:groupId",
  identifyUser,
  expenseController.getGroupExpensesController,
);

expenseRouter.get("/:id", identifyUser, expenseController.getExpenseController);

expenseRouter.put(
  "/:id",
  identifyUser,
  expenseController.updateExpenseController,
);

expenseRouter.delete(
  "/:id",
  identifyUser,
  expenseController.deleteExpenseController,
);

module.exports = expenseRouter;
