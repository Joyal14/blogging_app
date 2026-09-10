const comment = require("../models/comment");

const addComment = async (req, res) => {
    try {
        const { content } = req.body || {};
        const { blogId } = req.params;
        if (!req.user) {
            return res.status(401).json({ message: "Authentication required" });
        }
        if (!content || !blogId) {
            return res.status(400).json({ message: "Content and blogId are required" });
        }

        const createdBy = req.user.id;
        const newComment = new comment({ content, blogId, createdBy });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCommentsByBlogId = async (req, res) => {
    try {
        const { blogId } = req.params;
        const comments = await comment.find({ blogId }).populate("createdBy", "username email profileImage");
        res.status(200).json(comments);} catch (error) {
        res.status(500).json({ message: error.message });
    }};
    

module.exports = { addComment, getCommentsByBlogId };