const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    category: {
        type: String,
        required: [true, 'Category is required']
    },
    hashtags: {
        type: [String],
        default: [],
    },
    contributors: {
        type: [String],
        default: [],
    },
    date: {
        type: Date,
        required: [true, 'Date is required'],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Author is required'],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Project", ProjectSchema);
