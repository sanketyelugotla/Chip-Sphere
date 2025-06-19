const mongoose = require('mongoose');
const { Blog } = require("../models");
const dotenv = require("dotenv");
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

// Common image for all except the first
const sharedImage = "https://www.tessolve.com/wp-content/uploads/2023/12/memory-testing-post.jpg";

const blogData = [
    {
        title: "The Future of VLSI Design in 2025",
        image: sharedImage,
        description: "Exploring upcoming trends and technologies in VLSI design that will shape the industry in the coming years.",
        date: new Date("2023-05-15"),
        type: "Technology",
        durationRead: 8,
        author: "685199808f623fb5e7f50d6a"
    },
    {
        title: "Interview Experience: Senior VLSI Engineer at Intel",
        image: sharedImage,
        description: "A detailed account of the interview process for a Senior VLSI Engineer position at Intel, including technical questions and tips.",
        date: new Date("2023-04-22"),
        type: "Career",
        durationRead: 12,
        author: "685199808f623fb5e7f50d6a"
    },
    {
        title: "Understanding Power Optimization in Modern Chip Design",
        image: sharedImage,
        description: "A comprehensive guide to power optimization techniques in modern semiconductor design and their impact on performance.",
        date: new Date("2023-06-03"),
        type: "Technical",
        durationRead: 10,
        author: "685199808f623fb5e7f50d6a"
    },
    {
        title: "The Role of AI in VLSI Design Automation",
        image: sharedImage,
        description: "How artificial intelligence is revolutionizing VLSI design automation and improving efficiency in the design process.",
        date: new Date("2023-06-15"),
        type: "Technology",
        durationRead: 9,
        author: "685199808f623fb5e7f50d6a"
    },
    {
        title: "From Academia to Industry: My Journey in VLSI",
        image: sharedImage,
        description: "A personal account of transitioning from academic research to industry roles in VLSI design and the lessons learned along the way.",
        date: new Date("2023-05-28"),
        type: "Career",
        durationRead: 15,
        author: "685199808f623fb5e7f50d6a"
    },
    {
        title: "Challenges in 3nm Process Technology",
        image: sharedImage,
        description: "An in-depth look at the technical challenges and innovations in 3nm semiconductor process technology.",
        date: new Date("2023-06-10"),
        type: "Technical",
        durationRead: 11,
        author: "685199808f623fb5e7f50d6a"
    }
];

const seedBlogs = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected');

        await Blog.deleteMany(); // Optional: Clear old data
        await Blog.insertMany(blogData);

        console.log('Dummy blogs inserted');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedBlogs();
