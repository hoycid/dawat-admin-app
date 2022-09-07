import mongoose from "mongoose";

const OutboundSchema = new mongoose.Schema({
  img: {
    type: String,
    required: [true, "Missing image link!"],
  },
  type: {
    type: String,
    required: [true, "Missing type!"],
    maxLength: [40, "Type must be less than 40 chars!"],
  },
  sender: {
    type: String,
    required: [true, "Missing sender!"],
    maxLength: [40, "Sender must be less than 40 characters!"],
  },
  description: {
    type: String,
    maxLength: [200, "Description must be less than 400 characters!"],
  },
  date: {
    type: String,
    required: [true, "Missing date!"],
  },
  receiver: {
    type: String,
  },
  recipient: {
    type: String,
    required: [true, "Missing recipient!"],
  },
});

module.exports =
  mongoose.models.Outbound || mongoose.model("Outbound", OutboundSchema);
