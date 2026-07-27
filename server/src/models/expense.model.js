const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "groups",
      required: true,
    },

    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    participants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },

        amount: {
          type: Number,
          required: true,
        },
      },
    ],

    splitType: {
      type: String,
      enum: ["equal", "custom"],
      default: "equal",
    },

    expenseDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const expenseModel = mongoose.model("expenses", expenseSchema);
module.exports = expenseModel;
