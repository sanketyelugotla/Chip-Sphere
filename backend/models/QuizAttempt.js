const mongoose = require("mongoose");

const QuizAttemptSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'User is required']
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quizz", // Note: matches your existing model name
        required: [true, 'Quiz is required']
    },
    score: {
        type: Number,
        required: [true, 'Score is required'],
        min: 0
    },
    totalQuestions: {
        type: Number,
        required: [true, 'Total questions is required']
    },
    percentage: {
        type: Number,
        min: 0,
        max: 100
    },
    timeSpent: {
        type: Number, // in seconds
        default: 0
    },
    answers: [{
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        selectedAnswer: {
            type: String,
            required: true
        },
        isCorrect: {
            type: Boolean,
            required: true
        }
    }],
    status: {
        type: String,
        enum: {
            values: ['completed', 'in-progress', 'abandoned'],
            message: '{VALUE} is not a valid status'
        },
        default: 'completed'
    },
    attemptedAt: {
        type: Date,
        default: Date.now
    },
    completedAt: {
        type: Date
    }
}, {
    timestamps: true
});

// Calculate percentage before saving
QuizAttemptSchema.pre('save', function (next) {
    if (this.score !== undefined && this.totalQuestions > 0) {
        this.percentage = Math.round((this.score / this.totalQuestions) * 100);
    }
    next();
});

// Compound index to prevent duplicate attempts
QuizAttemptSchema.index({ user: 1, quiz: 1 }, { unique: true });

// Index for efficient queries
QuizAttemptSchema.index({ user: 1, attemptedAt: -1 });
QuizAttemptSchema.index({ quiz: 1, attemptedAt: -1 });

module.exports = mongoose.model("QuizAttempt", QuizAttemptSchema);