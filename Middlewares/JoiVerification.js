import { CONSTANTS } from "../Utils/Constants.js";

const isValid = (req, schema, next) => {
  const response = schema?.validate(req, { convert: false });
  if (response?.error?.details) {
    const errors = response?.error?.details?.map((item) => {
      return {
        message: item?.message,
        path: item?.path,
      };
    });
    return errors;
  }
  next();
};

export const validateRequestBody = (schema) => {
  return (req, res, next) => {
    const response = isValid(req.body, schema, next);
    if (response) {
      const errorResponse = { ...CONSTANTS.DEFAULT_RESPONSE };
      errorResponse.message = CONSTANTS.INVALID_BODY;
      errorResponse.body = response;
      res.status(errorResponse.status).send(errorResponse);
    }
  };
};

export const validateQuerryParams = (schmea) => {
  return (req, res, next) => {
    const response = isValid(req.query, schmea, next);
    if (response) {
      const errorResponse = { ...CONSTANTS.DEFAULT_RESPONSE };
      (errorResponse.message = CONSTANTS.INVALID_PARAMS),
        (errorResponse.body = response);
      res.status(errorResponse.status).send(errorResponse);
    }
  };
};
