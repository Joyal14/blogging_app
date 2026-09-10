const { Router } = require("express");
const router = Router();
const { addComment, getCommentsByBlogId } = require("../controllers/comment");

router.post("/add-comment/:blogId", addComment);
router.get("/get-comments/:blogId", getCommentsByBlogId);

module.exports = router;