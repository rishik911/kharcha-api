export const CONSTANTS = {
  DEFAULT_RESPONSE: {
    status: 401,
    message: "Something went wrong",
    body: {},
  },
  INVALID_PARAMS: "Invalid querry param!",
  AUTH_MESSAGES: {
    CREATED: "User created!",
    DUPLICATE_EMAIL: "Email is already in use!",
    EMAIL_DOESNT_EXIST: "Email does not exist",
    WRONG_PASSWORD: "The password is incorrect",
    INVALID_AUTH_TOKEN: "The token is invalid or exprire",
    PROVIDE_AUTH_TOKEN: "The authorization token is required!",
    PROFILE_UPDATED: "Profile updated!",
    IMAGE_UPLOADED: "profile image uploaded!",
  },
  STATUS: {
    EXPIRED_TOKEN: 402,
  },
  EXPENSE_MESSAGES: {
    YEAR_ADDED: "Added a new year",
    YEAR_EXISTS: ":Year alrady exists",
    NEW_MONTH_ADDED: "Added a new Month",
    ADDED_NEW_EXPENSE: "Added a new expense",
    FETCHED_EXPENSE: "Fetched all expenses",
    DUPLICATE_MONTH: "The month has already been added!",
    DUPLICATE_YEAR: "The year has already been added!",
    INVALID_YEAR: "Invalid year!",
    INVALID_MONTH: "Invalid month!",
  },
};
