const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    duration: {
        type: String,
        required: [true, 'Duration is required'],
    },
    level: {
        type: String,
        enum: {
            values: ['Intermediate', 'Beginner', 'Advanced'],
            message: '{VALUE} is not a valid level. Allowed levels are beginner, intermediate and advanced'
        }
    },
    category: {
        type: String,
        required: [true, 'Category is required']
    },
    questions: {
        type: Number,
        default: 0,
    },
    usersAttempted: {
        type: Number,
        default: 0,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Author is required'],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Quizz", QuizSchema);
