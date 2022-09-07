import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
  img: {
    type: String,
  },
  type: {
    type: String,

    maxLength: [40, "Type must be less than 40 chars!"],
  },
  sender: {
    type: String,

    maxLength: [40, "Sender must be less than 40 characters!"],
  },
  description: {
    type: String,
    maxLength: [200, "Description must be less than 400 characters!"],
  },
  date: {
    type: String,
  },
  receiver: {
    type: String,
  },
  recipient: {
    type: String,
  },
});

module.exports = mongoose.models.Log || mongoose.model("Log", LogSchema);
