import mongoose, { mongo } from "mongoose";

const userExpenseModel = mongoose.Schema({
  amount: Number,
  expenseType: String,
  date: String,
});

const SignUpModal = mongoose.Schema(
  {
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    expenses: [userExpenseModel],
    totalAmount : Number

  },
  {
    timestamp: true,
    toObject: {
      transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const userExpensesModel = mongoose.model(
  "userExpense",
  userExpenseModel
);

export default mongoose.model("signUp", SignUpModal);
