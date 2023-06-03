import mongoose, { mongo } from "mongoose";

const expenseModel = mongoose.Schema(
  {
    expenseType: String,
    amount: Number,
    spendBy: String,
    spendOn: String,
  },
  {
    timestamp: true,
    toObject: {
      transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const MonthlyExpenseModel = mongoose.Schema(
  {
    monthName: String,
    expenseDetails: [expenseModel],
    total: Number,
  },
  {
    timestamp: true,
    toObject: {
      transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const ExpenseModel = mongoose.Schema(
  {
    year: String,
    months: [MonthlyExpenseModel],
  },
  {
    timestamp: true,
    toObject: {
      transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const GroupModel = mongoose.Schema(
  {
    groupName: String,
    years: [ExpenseModel],
  },

  {
    timestamp: true,
    toObject: {
      transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const newMonthModel = mongoose.model("monthly", MonthlyExpenseModel);
export const newExpenseModel = mongoose.model("newExpense", expenseModel);

export const newGroupModel = mongoose.model("newGroup", GroupModel);

export default mongoose.model("expenseModel", ExpenseModel);
