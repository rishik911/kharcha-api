import SignUpModal, {
  imageModel,
} from "../database/Modals/AuthModule/SignupModal.js";
import { CONSTANTS } from "../Utils/Constants.js";
import bcrypt from "bcrypt";
import { convertToObject } from "../Utils/Helpers.js";
import jwt from "jsonwebtoken";

export const createUserService = async (serviceData) => {
  try {
    const isEmailDuplicate = await SignUpModal.findOne({
      email: serviceData?.email,
    });
    if (isEmailDuplicate) {
      throw new Error(CONSTANTS.AUTH_MESSAGES.DUPLICATE_EMAIL);
    }
    serviceData.password = await bcrypt.hash(serviceData?.password, 12);
    const signUp = new SignUpModal({
      ...serviceData,
      totalAmount: 0,

      image: null,
    });
    let result = await signUp.save();
    return convertToObject(result);
  } catch (e) {
    throw new Error(e);
  }
};

export const loginUserService = async (serviceData) => {
  try {
    const userData = await SignUpModal.findOne({
      email: serviceData?.email,
    });
    if (!userData) {
      throw new Error(CONSTANTS.AUTH_MESSAGES.EMAIL_DOESNT_EXIST);
    }
    const isPasswordValid = await bcrypt.compare(
      serviceData.password,
      userData.password
    );
    if (!isPasswordValid) {
      throw new Error(CONSTANTS.AUTH_MESSAGES.WRONG_PASSWORD);
    }
    const token = jwt.sign({ id: userData._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    return { token };
  } catch (e) {
    throw new Error(e);
  }
};

export const getUserProfileService = async (serviceData) => {
  try {
    const token = serviceData?.headers?.authorization
      ?.split("Bearer")[1]
      .trim();
    const isValid = jwt.verify(token, process.env.SECRET_KEY);
    if (isValid?.id) {
      const userData = await SignUpModal.findById(isValid.id);
      if (userData) return convertToObject(userData);
      else {
        throw new Error(CONSTANTS.AUTH_MESSAGES.INVALID_AUTH_TOKEN);
      }
    }
  } catch (e) {
    throw new Error(e);
  }
};

export const updateProfileService = async (serviceData) => {
  try {
    const { body } = serviceData;

    const token = serviceData?.headers?.authorization
      ?.split("Bearer")[1]
      .trim();
    const isValid = jwt.verify(token, process.env.SECRET_KEY);
    if (isValid?.id) {
      const userData = await SignUpModal.findByIdAndUpdate(isValid.id, body, {
        new: true,
      });
      console.log(body);
      if (userData) return convertToObject(userData);
      else {
        throw new Error(CONSTANTS.AUTH_MESSAGES.INVALID_AUTH_TOKEN);
      }
    }
  } catch (e) {
    throw new Error(e);
  }
};
