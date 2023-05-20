import Joi from "joi";

export const newYearSchema = Joi.object({
  year: Joi.string().required(),
});

export const newMonthSchema = Joi.object({
  year: Joi.string().required(),
  monthName: Joi.string().required(),
  total: Joi.number().required(),
});

export const expenseQueryParamSchema = Joi.object({
  year: Joi.string(),
});

export const newExpenseSchema = Joi.object({
  year: Joi.string().required(),
  month: Joi.string().required(),
  expense: Joi.object({
    expenseType: Joi.string().required(),
    amount: Joi.number().required(),
    spendBy: Joi.string().required(),
    spendOn: Joi.string().required(),
  }),
});
