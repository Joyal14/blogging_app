const Blog = require("../models/blog");

const addBlog = (req, res) => {
  res.render("blog-add", {
    user: req.user
  });
}

const apiListBlog = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "username email profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({ blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

const apiAddBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body || {};
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
    const uploadedImage = req.files?.image?.[0] || req.files?.coverImage?.[0];
    const coverImage = uploadedImage ? `/images/${uploadedImage.filename}` : "/images/default.png";

    // Save blog post to database
    const blogPost = await Blog.create({ 
      title, 
      content, 
      coverImage,
      author: req.user.id 
    });

    res.status(201).json({ message: "Blog post added successfully", blogPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const addBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const uploadedImage = req.files?.image?.[0] || req.files?.coverImage?.[0];
    const coverImage = uploadedImage ? `/images/${uploadedImage.filename}` : "/images/default.png";

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


module.exports = { addBlog, addBlogPost, apiAddBlogPost, apiListBlog };