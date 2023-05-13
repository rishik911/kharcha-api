import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
    console.log("Connected to DB");
  } catch (e) {
    console.log("Connection to db failed", e);
    throw new Error(e);
  }
};
