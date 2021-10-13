const router = require('express').Router()
const { createPost, getPost, getAllPosts, updatePost, deletePost } = require('../controllers/postController')

router.route("/posts").get(getAllPosts).post(createPost)
router.route("/posts/:id").get(getPost).put(updatePost).post(updatePost).delete(deletePost)

module.exports = router
