const { Router } = require('express');
const {
    apiAddBlog,
    apiAddBlogPost
} = require('../controllers/blog');

const router = Router();

router.get('/add-blog', apiAddBlog);
router.post('/add-blog-post', apiAddBlogPost); 

module.exports = router;