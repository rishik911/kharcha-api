import { CONSTANTS } from "../Utils/Constants.js";
import { convertToObject } from "../Utils/Helpers.js";
import SignupModal, {
  userExpensesModel,
} from "../database/Modals/AuthModule/SignupModal.js";
import ExpenseModel, {
  newExpenseModel,
  newMonthModel,
} from "../database/Modals/ExpenseModule/ExpenseModel.js";
import jwt from "jsonwebtoken";

export const createNewYearService = async (serviceData) => {
  try {
    const { year } = serviceData;
    const newExpenseYear = new ExpenseModel({ year, months: [] });
    const result = await newExpenseYear.save();
    return convertToObject(result);
  } catch (e) {
    throw new Error(e);
  }
};

export const createNewMonthService = async (serviceData) => {
  try {
    const { year, monthName } = serviceData;
    const newMonth = new newMonthModel({ monthName, expenseDetails: [] });
    const yearData = await ExpenseModel.findById(year);
    if (!yearData) {
      throw new Error(CONSTANTS.EXPENSE_MESSAGES.INVALID_YEAR);
    }
    const isMonthPresent = yearData?.months?.find(
      (month) => monthName === month?.monthName
    );
    if (isMonthPresent) {
      throw new Error(CONSTANTS.EXPENSE_MESSAGES.DUPLICATE_MONTH);
    }
    yearData.months.push(newMonth);
    const newData = await yearData.save();
    return convertToObject(newData);
  } catch (e) {
    throw new Error(e);
  }
};

export const createNewExpenseService = async (serviceData, headers) => {
  try {
    const { year, month, expense } = serviceData;

    const yearData = await ExpenseModel.findById(year);

    if (yearData && yearData?.months) {
      const monthIndex = yearData.months.findIndex((curr) => {
        return curr?.monthName === month;
      });
      if (monthIndex >= 0) {
        const newExpense = new newExpenseModel({ ...expense });
        yearData.months[monthIndex].expenseDetails.push(newExpense);
        const newData = await yearData.save();
        updateUserExpenseProfileService(
          {
            amount: expense.amount,
            expenseType: expense.expenseType,
            date: new Date(),
          },
          headers
        );
        return convertToObject(newData);
      } else {
        throw new Error(CONSTANTS.EXPENSE_MESSAGES.INVALID_MONTH);
      }
    } else {
      throw new Error(CONSTANTS.EXPENSE_MESSAGES.INVALID_YEAR);
    }
  } catch (e) {
    throw new Error(e);
  }
};

export const updateUserExpenseProfileService = async (serviceData, headers) => {
  try {
    const { authorization } = headers;
    const token = authorization?.split("Bearer")[1].trim();
    const userID = jwt.verify(token, process.env.SECRET_KEY);
    if (!userID?.id) {
      throw new Error(CONSTANTS.AUTH_MESSAGES.INVALID_AUTH_TOKEN);
    }
    const userDetails = await SignupModal.findById(userID.id);
    const userExpense = new userExpensesModel({ ...serviceData });
    userDetails.expenses.push(userExpense);
    const response = await userDetails.save();
    return convertToObject(response);
  } catch (e) {
    throw new Error(e);
  }
};

export const getAllExpenseDataService = async (serviceData) => {
  try {
    const { year } = serviceData;

    const yearData = await ExpenseModel.findById(year);

    return convertToObject(yearData);
  } catch (e) {
    throw new Error(e);
  }
};
