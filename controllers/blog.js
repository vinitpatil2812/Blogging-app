const path = require("path");

const Blog = require("../models/blog");
const Comment = require("../models/comment");
const User = require("../models/user");

const handleGetBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    const comments = await Comment.find({ blogId: req.params.id });

    // console.log(blog);

    return res.render("./partials/blog", {
        user: req.user,
        blog,
        comments,
    });
}

const handleGetBlogComment = async (req, res) => {
    const comment = await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id,
    });

    return res.redirect(`/blog/${req.params.blogId}`);
}

const handleUploadBlog = async (req, res) => {
    const { title, body } = req.body;
    const blog = await Blog.create({
        title,
        body,
        createdBy: req.user._id,
        coverImageURL: `../../public/images/uploads/${req.file.filename}`,
    });

    return res.redirect(`/blog/${blog._id}`);
}

module.exports = {
    handleGetBlog,
    handleGetBlogComment,
    handleUploadBlog,
};