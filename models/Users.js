const mongoose = require("mongoose");
const bycript = require("bcryptjs");

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
})

usersSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bycript.hash(user.password, 8);
  }
})

module.exports = mongoose.model("Users", usersSchema)