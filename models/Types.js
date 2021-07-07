import mongoose from "mongoose";

const TypesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'add name'],
        maxLength: [40, 'name must be 40 chars']
    },
    color: {
        type: String,
        required: [true, 'specify color'],
        maxLength: [40, 'color string must be 40 chars']
    },
    icon: {
        type: String,
        required: [true, 'specify icon'],
        maxLength: [40, 'icon string must be 40 chars']
    },
})

module.exports = mongoose.models.Types || mongoose.model("Types", TypesSchema);