const { Router } = require('express');
const {
    apiListBlog,
    apiAddBlogPost
} = require('../controllers/blog');
const upload = require('../middlewares/upload');

const router = Router();

router.get('/blog-list', apiListBlog);
router.post('/add-blog-post', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }
]), apiAddBlogPost);

module.exports = router;