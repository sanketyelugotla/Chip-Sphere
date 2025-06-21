const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Quiz Id is required'],
    },
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    options: {
        type: [String],
        required: [true, 'Options are required'],
        validate: {
            validator: function (v) {
                return Array.isArray(v) && v.length >= 2;
            },
            message: 'A question must have at least two options'
        }
    },
    answer: {
        type: String,
        required: [true, 'Answer is required']
    },
    type: {
        type: String,
        enum: ['mcq', 'true-false', 'fill-in-the-blank'],
        default: 'mcq'
    },
    explanation: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model("Question", QuestionSchema);
