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
  newGroupSchema,
  newMonthSchema,
  newYearSchema,
} from "../Schemas/ExpenseSchema.js";
import {
  createNewExpenseController,
  createNewGroupController,
  createNewMonthController,
  createNewYearController,
  getExpenseDataController,
  getMnthlyExpenseController,
} from "../Controller/ExpenseCOntroller.js";

const Router = express.Router();

Router.post(
  "/group",
  verifyAuthToken,
  validateRequestBody(newGroupSchema),
  createNewGroupController
);

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

Router.get("/:groupName", verifyAuthToken, getExpenseDataController);

Router.get(
  "/:groupName/:year/:month",
  verifyAuthToken,
  getMnthlyExpenseController
);

Router.post(
  "/createExpense",
  verifyAuthToken,
  validateRequestBody(newExpenseSchema),
  createNewExpenseController
);
export default Router;
