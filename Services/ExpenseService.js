import { CONSTANTS } from "../Utils/Constants.js";
import { convertToObject } from "../Utils/Helpers.js";
import SignupModal, {
  userExpensesModel,
} from "../database/Modals/AuthModule/SignupModal.js";
import ExpenseModel, {
  newExpenseModel,
  newMonthModel,
  newGroupModel,
} from "../database/Modals/ExpenseModule/ExpenseModel.js";
import jwt from "jsonwebtoken";

export const createNewGroupService = async (serviceData) => {
  try {
    const { groupName } = serviceData;
    const groupData = await newGroupModel.findOne({ groupName: groupName });
    if (groupData) {
      throw new Error(CONSTANTS.EXPENSE_MESSAGES.GROUP_EXISTS);
    }
    const newGroupData = new newGroupModel({ groupName, years: [] });
    const result = await newGroupData.save();
    return convertToObject(result);
  } catch (e) {
    throw new Error(e);
  }
};

export const createNewYearService = async (serviceData) => {
  try {
    const { year, groupName } = serviceData;

    const groupData = await newGroupModel.findOne({ groupName });

    if (!groupData) {
      throw new Error(CONSTANTS.EXPENSE_MESSAGES.INVALID_GROUP);
    }

    const isYearPresent = groupData?.years?.find((curr) => {
      return year === curr?.year;
    });
    if (isYearPresent) {
      throw new Error(CONSTANTS.EXPENSE_MESSAGES.YEAR_EXISTS);
    }
    const newExpenseYear = new ExpenseModel({ year, months: [] });
    groupData.years.push(newExpenseYear);
    const newGroup = await groupData.save();

    return convertToObject(newGroup);
  } catch (e) {
    throw new Error(e);
  }
};

export const createNewMonthService = async (serviceData) => {
  try {
    const { year, monthName, total, groupName } = serviceData;
    const newMonth = new newMonthModel({
      monthName,
      expenseDetails: [],
      total,
    });

    const groupData = await newGroupModel.findOne({ groupName });

    if (!groupData) {
      throw new Error(CONSTANTS.EXPENSE_MESSAGES.INVALID_GROUP);
    }

    const yearData = groupData?.years?.findIndex((curr) => {
      return year === curr?.year;
    });
    if (yearData < 0) {
      throw new Error(CONSTANTS.EXPENSE_MESSAGES.INVALID_YEAR);
    }

    const isMonthPresent = groupData?.years?.[yearData]?.months?.find(
      (month) => monthName === month?.monthName
    );
    if (isMonthPresent) {
      throw new Error(CONSTANTS.EXPENSE_MESSAGES.DUPLICATE_MONTH);
    }
    groupData.years[yearData].months.push(newMonth);

    const newData = await groupData.save();
    return convertToObject(newData);
  } catch (e) {
    throw new Error(e);
  }
};

export const createNewExpenseService = async (serviceData, headers) => {
  try {
    const { year, month, expense, groupName } = serviceData;
    const groupData = await newGroupModel.findOne({ groupName });

    if (!groupData) {
      throw new Error(CONSTANTS.EXPENSE_MESSAGES.INVALID_GROUP);
    }

    const yearData = groupData?.years?.findIndex((curr) => {
      return year === curr?.year;
    });
    if (yearData < 0) {
      throw new Error(CONSTANTS.EXPENSE_MESSAGES.INVALID_YEAR);
    }

    const monthIndex = groupData?.years?.[yearData]?.months?.findIndex(
      (curr) => month === curr?.monthName
    );

    if (monthIndex >= 0) {
      const newExpense = new newExpenseModel({ ...expense });
      groupData.years[yearData].months[monthIndex].expenseDetails.push(
        newExpense
      );
      groupData.years[yearData].months[monthIndex].total += expense.amount;
      const newData = await groupData.save();
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
    console.log(userDetails);
    userDetails.expenses.push(userExpense);
    userDetails.totalAmount += serviceData.amount;
    const response = await userDetails.save();
    return convertToObject(response);
  } catch (e) {
    throw new Error(e);
  }
};

export const getAllExpenseDataService = async (serviceData) => {
  try {
    const { groupName } = serviceData;
    const yearData = await newGroupModel.findOne({ groupName: groupName });

    return convertToObject(yearData);
  } catch (e) {
    throw new Error(e);
  }
};

export const getMonthlyExpenses = async (serviceData) => {
  try {
    const { groupName, year, month } = serviceData;
    const groupData = await newGroupModel.findOne({ groupName: groupName });
    if (groupData && groupData?.years) {
      const yearData = groupData.years.find((curr) => {
        return curr?.year === year;
      });
      if (!yearData) {
        throw new Error(CONSTANTS.INVALID_YEAR);
      }
      console.log(yearData);
      const monthData = yearData.months.find(
        (curr) => curr.monthName === month
      );
      if (!monthData) {
        throw new Error(CONSTANTS.EXPENSE_MESSAGES.INVALID_MONTH);
      }
      return convertToObject(monthData);
    } else {
      throw new Error(CONSTANTS.EXPENSE_MESSAGES.INVALID_YEAR);
    }
  } catch (e) {
    throw new Error(e);
  }
};
