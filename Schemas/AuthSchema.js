import Joi from "joi";

export const SignUpSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  image: Joi.any(),
});

export const ProfileUpdateSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  image: Joi.any(),
  groupName: Joi.string(),
});

export const UploadProfileImageSchema = Joi.object({
  image: Joi.any().required(),
});
