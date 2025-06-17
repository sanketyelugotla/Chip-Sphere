const Blog = require("../models");

const getBlogs = async () => {
    try {
        const blogs = await Blog.find().populate("author", "name");
        return blogs;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

const addBlog = async ({ title, image, description, date, type, durationRead, user }) => {
    try {
        const blog = new Blog({
            title, image, description, date, type, durationRead, author: user._id
        });

        const saved = await blog.save();
        return saved;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

module.exports = {
    getBlogs,
    addBlog,
};
