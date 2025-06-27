const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quizz", // Fixed: was "User", should be "Quizz"
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
        required: [true, 'Answer is required'],
        validate: {
            validator: function (v) {
                // Ensure the answer is one of the options
                return this.options && this.options.includes(v);
            },
            message: 'Answer must be one of the provided options'
        }
    },
    type: {
        type: String,
        enum: ['mcq', 'true-false', 'fill-in-the-blank'],
        default: 'mcq'
    },
    explanation: {
        type: String,
        default: ''
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium'
    },
}, {
    timestamps: true,
});

// Index for efficient queries
QuestionSchema.index({ quizId: 1 });

module.exports = mongoose.model("Question", QuestionSchema);