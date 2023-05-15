import {
  createNewExpenseService,
  createNewMonthService,
  createNewYearService,
  getAllExpenseDataService,
} from "../Services/ExpenseService.js";
import { CONSTANTS } from "../Utils/Constants.js";

export const createNewYearController = async (req, res) => {
  const serverResponse = { ...CONSTANTS.DEFAULT_RESPONSE };
  try {
    let yearResponse = await createNewYearService(req.body);
    serverResponse.status = 200;
    (serverResponse.message = CONSTANTS.EXPENSE_MESSAGES.YEAR_ADDED),
      (serverResponse.body = yearResponse);
  } catch (e) {
    console.log("error in adding new year==>", e);
    serverResponse.status = 401;
    serverResponse.message = e.message;
  }
  return res.status(serverResponse.status).send(serverResponse);
};

export const createNewMonthController = async (req, res) => {
  const serverResponse = { ...CONSTANTS.DEFAULT_RESPONSE };
  try {
    let yearResponse = await createNewMonthService(req.body);
    serverResponse.status = 200;
    (serverResponse.message = CONSTANTS.EXPENSE_MESSAGES.NEW_MONTH_ADDED),
      (serverResponse.body = yearResponse);
  } catch (e) {
    console.log("error in adding new month==>", e);
    serverResponse.status = 401;
    serverResponse.message = e.message;
  }
  return res.status(serverResponse.status).send(serverResponse);
};

export const createNewExpenseController = async (req, res) => {
  const serverResponse = { ...CONSTANTS.DEFAULT_RESPONSE };
  try {
    let yearResponse = await createNewExpenseService(req.body, req.headers);
    serverResponse.status = 200;
    (serverResponse.message = CONSTANTS.EXPENSE_MESSAGES.ADDED_NEW_EXPENSE),
      (serverResponse.body = yearResponse);
  } catch (e) {
    console.log("error in adding new expense==>", e);
    serverResponse.status = 401;
    serverResponse.message = e.message;
  }
  return res.status(serverResponse.status).send(serverResponse);
};

export const getExpenseDataController = async (req, res) => {
  const serverResponse = { ...CONSTANTS.DEFAULT_RESPONSE };
  try {
    let yearResponse = await getAllExpenseDataService(req?.params);
    serverResponse.status = 200;
    (serverResponse.message = CONSTANTS.EXPENSE_MESSAGES.FETCHED_EXPENSE),
      (serverResponse.body = yearResponse);
  } catch (e) {
    console.log("error in fetching expenses==>", e);
    serverResponse.status = 401;
    serverResponse.message = e.message;
  }
  return res.status(serverResponse.status).send(serverResponse);
};
