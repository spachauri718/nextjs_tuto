import mongoose from "mongoose";

// Check if the model already exists
const User =
  mongoose.models.User ||
  mongoose.model(
    "User",
    new mongoose.Schema({
      username: {
        type: "string",
        required: [true, "Please Enter Username"],
        unique: true,
      },
      email: {
        type: "string",
        required: [true, "Please Enter email"],
      },
      isVarified: {
        type: "boolean",
        default: false,
      },
      isAdmin: {
        type: "boolean",
        default: false,
      },
      forgotPasswordToken: String,
      forgotPasswordTokenExpiry: Date,
      verifyToken: String,
      verifTokenExpiry: Date,
    })
  );

export default User;
