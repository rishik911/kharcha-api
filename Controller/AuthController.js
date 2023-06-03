import {
  createUserService,
  getUserProfileService,
  loginUserService,
  updateProfileService,

} from "../Services/AuthService.js";
import { CONSTANTS } from "../Utils/Constants.js";

export const createUserController = async (req, res) => {
  const serverResponse = { ...CONSTANTS.DEFAULT_RESPONSE };
  try {
    let productResponse = await createUserService(req.body);
    serverResponse.status = 200;
    (serverResponse.message = CONSTANTS.AUTH_MESSAGES.CREATED),
      (serverResponse.body = productResponse);
  } catch (e) {
    console.log("error in creating products==>", e);
    serverResponse.status = 401;
    serverResponse.message = e.message;
  }
  return res.status(serverResponse.status).send(serverResponse);
};

export const loginUserController = async (req, res) => {
  const serverResponse = { ...CONSTANTS.DEFAULT_RESPONSE };
  try {
    let productResponse = await loginUserService(req.body);
    serverResponse.status = 200;
    (serverResponse.message = CONSTANTS.AUTH_MESSAGES.CREATED),
      (serverResponse.body = productResponse);
  } catch (e) {
    console.log("error in creating products==>", e);
    serverResponse.status = 401;
    serverResponse.message = e.message;
  }
  return res.status(serverResponse.status).send(serverResponse);
};

export const getUserProfileController = async (req, res) => {
  const serverResponse = { ...CONSTANTS.DEFAULT_RESPONSE };
  try {
    let productResponse = await getUserProfileService(req);
    serverResponse.status = 200;
    (serverResponse.message = CONSTANTS.AUTH_MESSAGES.CREATED),
      (serverResponse.body = productResponse);
  } catch (e) {
    console.log("error in creating products==>", e);
    serverResponse.status = 401;
    serverResponse.message = e.message;
  }
  return res.status(serverResponse.status).send(serverResponse);
};

export const updateProfileController = async (req, res) => {
  const serverResponse = { ...CONSTANTS.DEFAULT_RESPONSE };
  try {
    let productResponse = await updateProfileService(req);
    serverResponse.status = 200;
    (serverResponse.message = CONSTANTS.AUTH_MESSAGES.PROFILE_UPDATED),
      (serverResponse.body = productResponse);
  } catch (e) {
    console.log("error in updating profile==>", e);
    serverResponse.status = 401;
    serverResponse.message = e.message;
  }
  return res.status(serverResponse.status).send(serverResponse);
};
