const { Router } = require("express");
const router = Router();
const {addBlog,addBlogPost} = require("../controllers/blog");
const upload = require('../middlewares/upload');

router.get("/add-blog", addBlog);

router.post('/add-blog', upload.fields([
	{ name: 'image', maxCount: 1 },
	{ name: 'coverImage', maxCount: 1 }
]), addBlogPost);

module.exports = router;