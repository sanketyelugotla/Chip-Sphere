const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
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
            values: ['intermediate', 'beginner', 'advanced'],
            message: '{VALUE} is not a valid level. Allowed levels are beginner, intermediate and advanced'
        }
    },
    subject: {
        type: String,
        required: [true, 'Subject is required']
    },
});

module.exports = mongoose.model("Quizz", QuizSchema);
