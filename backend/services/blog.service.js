const { Blog } = require("../models");

const getBlogs = async () => {
    try {
        const blogs = await Blog.find().populate("author", "name");
        return blogs;
    } catch (error) {
        // console.log(error);
        throw new Error(error);
    }
};

const addBlog = async ({ title, image, description, type, durationRead, user }) => {
    try {
        const blog = new Blog({
            title,
            image,
            description,
            date: new Date(),
            type,
            durationRead,
            author: user._id
        });

        const saved = await blog.save();
        return saved;
    } catch (error) {
        // console.log(error);
        throw new Error(error);
    }
};

const getBlog = async (id) => {
    try {
        const blog = await Blog.findById(id).populate("author", "name");
        if (!blog) throw new Error("Blog not found");
        return blog;
    } catch (error) {
        console.error("Error fetching blog:", error.message);
        throw new Error("Failed to fetch blog");
    }
};

module.exports = {
    getBlogs,
    addBlog,
    getBlog,
};
