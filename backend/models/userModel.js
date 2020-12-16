import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true, index: true, dropDups: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  date: { type: Date, default: Date.now }
}, {
  timestamps: true
});
const userModel = mongoose.model("User", userSchema);
export default userModel;
