import mongoose from "mongoose";

const InboundSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, 'Missing type!'],
        maxLength: [40, 'Type must be less than 40 chars!']
    },
    sender: {
        type: String,
        required: [true, 'Missing sender!'],
        maxLength: [40, 'Sender must be less than 40 characters!']
    },
    description: {
        type: String,
        required: [false],
        maxLength: [200, 'Description must be less than 400 characters!']
    },
    date: {
        type: String,
        required: [true, 'Missing sender!']
    }
})

module.exports = mongoose.models.Inbound || mongoose.model("Inbound", InboundSchema);