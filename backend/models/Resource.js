const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    typeOfFile: {
        type: String,
        enum: {
            values: ['pdf', 'video', 'document'],
            message: '{VALUE} is not a valid file type. Allowed types are pdf, video, audio, and image'
        },
        required: [true, 'Type of file is required']
    },
    typeOfMaterial: {
        type: String,
        enum: {
            values: ['lecture-notes', 'question-papers', 'assignments'],
            message: '{VALUE} is not a valid material type. Allowed types are lecture-notes, question-papers, and assignments'
        },
        required: [true, 'Type of material is required']
    },
    file: {
        type: String,
        required: [true, 'File is required'],
        // validate: {
        //     validator: function (v) {
        //         return /\.(pdf|mp4|docx)$/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid file format!`
        // }
    },
    sizeOfFile: {
        type: Number,
        required: [true, 'Size of file is required'],
        min: [1, 'Size must be at least 1 byte']
    },
    noOfDownloads: {
        type: Number,
        default: 0,
        min: [0, 'Number of downloads cannot be negative']
    },
    noOfSaves: {
        type: Number,
        default: 0,
        min: [0, 'Number of saves cannot be negative']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Author is required'],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Resource", ResourceSchema);
