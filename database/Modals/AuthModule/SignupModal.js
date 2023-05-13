import mongoose, { mongo } from "mongoose";

const SignUpModal = mongoose.Schema(
  {
    email: String,
    password: String,
    firstName: String,
    lastName: String,
  },
  {
    timestamp: true,
    toObject: {
      transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export default mongoose.model("signUp", SignUpModal);
