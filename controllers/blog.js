const Blog = require("../models/blog");

const addBlog = (req, res) => {
  res.render("blog-add", {
    user: req.user
  });
}

const addBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const coverImage = req.file ? `/images/${req.file.filename}` : "/images/default.png";

    // Save blog post to database
    await Blog.create({ 
      title, 
      content, 
      coverImage, 
      author: req.user.id 
    });

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { user: req.user, errorMessage: error.message });
  }
};

module.exports = { addBlog, addBlogPost };