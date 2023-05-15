import express from "express";
import {
  validateQuerryParams,
  validateRequestBody,
} from "../Middlewares/JoiVerification.js";
import { SignUpSchema } from "../Schemas/AuthSchema.js";

import { verifyAuthToken } from "../Middlewares/AuthVerification.js";
import {
  expenseQueryParamSchema,
  newExpenseSchema,
  newMonthSchema,
  newYearSchema,
} from "../Schemas/ExpenseSchema.js";
import {
  createNewExpenseController,
  createNewMonthController,
  createNewYearController,
  getExpenseDataController,
} from "../Controller/ExpenseCOntroller.js";

const Router = express.Router();

Router.post(
  "/year",
  verifyAuthToken,
  validateRequestBody(newYearSchema),
  createNewYearController
);

Router.post(
  "/month",
  verifyAuthToken,
  validateRequestBody(newMonthSchema),
  createNewMonthController
);

Router.get("/:year", verifyAuthToken, getExpenseDataController);

Router.post(
  "/expense",
  verifyAuthToken,
  validateRequestBody(newExpenseSchema),
  createNewExpenseController
);
export default Router;