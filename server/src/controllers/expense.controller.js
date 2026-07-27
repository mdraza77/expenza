const expenseModel = require("../models/expense.model");
const groupModel = require("../models/group.model");
const userModel = require("../models/user.model");

const createExpenseController = async (req, res) => {
  try {
    const {
      title,
      description,
      amount,
      group,
      paidBy,
      participants,
      splitType,
      expenseDate,
    } = req.body;

    const groupExists = await groupModel.findById(group);

    if (!groupExists) {
      return res.status(404).json({
        message: "Group not found",
      });
    }

    const expense = await expenseModel.create({
      title,
      description,
      amount,
      group,
      paidBy,
      participants,
      splitType,
      expenseDate,
    });

    return res.status(201).json({
      message: "Expense created successfully",
      expense,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while creating expense",
      error: error.message,
    });
  }
};

const getGroupExpensesController = async (req, res) => {
  try {
    const { groupId } = req.params;

    const group = await groupModel.findById(groupId);

    if (!group) {
      return res.status(404).json({
        message: "Group not found",
      });
    }

    const expenses = await expenseModel
      .find({ group: groupId })
      .populate("paidBy", "name username email")
      .populate("participants.user", "name username email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Expenses fetched successfully",
      expenses,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while fetching expenses",
      error: error.message,
    });
  }
};

const getExpenseController = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await expenseModel
      .findById(id)
      .populate("group", "name")
      .populate("paidBy", "name username email")
      .populate("participants.user", "name username email");

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    return res.status(200).json({
      message: "Expense fetched successfully",
      expense,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while fetching expense",
      error: error.message,
    });
  }
};

const updateExpenseController = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await expenseModel.findById(id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    const {
      title,
      description,
      amount,
      group,
      paidBy,
      participants,
      splitType,
      expenseDate,
    } = req.body;

    expense.title = title ?? expense.title;
    expense.description = description ?? expense.description;
    expense.amount = amount ?? expense.amount;
    expense.group = group ?? expense.group;
    expense.paidBy = paidBy ?? expense.paidBy;
    expense.participants = participants ?? expense.participants;
    expense.splitType = splitType ?? expense.splitType;
    expense.expenseDate = expenseDate ?? expense.expenseDate;

    await expense.save();

    return res.status(200).json({
      message: "Expense updated successfully",
      expense,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while updating expense",
      error: error.message,
    });
  }
};

const deleteExpenseController = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await expenseModel.findById(id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    await expense.deleteOne();

    return res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while deleting expense",
      error: error.message,
    });
  }
};

module.exports = {
  createExpenseController,
  getGroupExpensesController,
  getExpenseController,
  updateExpenseController,
  deleteExpenseController,
};
