const { Router } = require("express");
const router = Router();
const {addBlog,addBlogPost} = require("../controllers/blog");
const upload = require('../middlewares/upload');

router.get("/add-blog", addBlog);

router.post('/add-blog', upload.single('image'), addBlogPost);

module.exports = router;