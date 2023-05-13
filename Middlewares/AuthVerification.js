import jwt from "jsonwebtoken";
import { CONSTANTS } from "../Utils/Constants.js";

export const verifyAuthToken = async (req, res, next) => {
  const response = { ...CONSTANTS.DEFAULT_RESPONSE };
  try {
    if (req?.headers?.authorization) {
      const token = req?.headers?.authorization?.split("Bearer")[1].trim();
      const isValid = jwt.verify(token, process.env.SECRET_KEY);
      if (isValid) {
        next();
      } else {
        response.status = CONSTANTS.STATUS.EXPIRED_TOKEN;
        response.message = CONSTANTS.AUTH_MESSAGES.INVALID_AUTH_TOKEN;
        res.status(response.status).send(response);
      }
    } else throw new Error(CONSTANTS.AUTH_MESSAGES.PROVIDE_AUTH_TOKEN);
  } catch (e) {
    response.status = 401;
    response.message = e.message;
    res.status(response.status).send(response);
  }
};
