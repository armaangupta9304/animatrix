const mongoose = require("mongoose");
const post = require('./Post');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "A Username is required"],
    min: 4,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "For account creation we need your email"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  role: {
    type: Number,
    default: 0,
  },
  legacy: {
    type: String,
    required: true,
    default: "Peasent",
  },
  posts: [],
});

const userModel = mongoose.model("user", userSchema);
module.exports = { userSchema: userSchema, userModel: userModel };
