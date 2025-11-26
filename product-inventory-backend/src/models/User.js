import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  avatar: String,
  authType: { type: String, default: "password" },

});

export default mongoose.model("User", userSchema);
