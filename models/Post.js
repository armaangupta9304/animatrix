const mongoose = require("mongoose");
const User = require('./User');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A Title Is Required In A Post"],
  },
  content: {
    type: String,
    required: [true, "Bruh a post without content? You mad or what"],
  },
  author: {
    type: String,
    default: "Guest",
  },
  legacy: {
    type: String,
    default: "Peasent",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    default: null
  }
});

const postModel = mongoose.model("post", postSchema);
module.exports = { postSchema, postModel };
