const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
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
    date: {
        type: Date,
        required: [true, 'Date is required'],
    },
    type: {
        type: String,
        enum: {
            values: ['Career', 'Technical', 'Technology'],
            message: '{VALUE} is not a valid type. Allowed types are Career, Technical and Technology',
        }
    },
    durationRead: {
        type: Number,
        default: 0,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Author is required'],
    },
    content: {
        type: String,
        required: [true, 'content is required'],
    },
});

module.exports = mongoose.model("Blog", BlogSchema);
