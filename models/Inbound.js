import mongoose from "mongoose";

const InboundSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, 'add type'],
        maxLength: [40, 'type must be 40 chars']
    },
    sender: {
        type: String,
        required: [true, 'add sender'],
        maxLength: [40, 'sender must be 40 chars']
    },
    description: {
        type: String,
        required: [false],
        maxLength: [200, 'desc must be 200 chars']
    },
    date: {
        type: Date,
        default: Date.now,
        required: [true]
    }
})

module.exports = mongoose.models.Inbound || mongoose.model("Inbound", InboundSchema);