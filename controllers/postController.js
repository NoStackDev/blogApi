const Post = require("../models/Post")
const User = require("../models/User")


// create post
const createPost = async (req, res) => {
    try {
        const user = await User.findById(req.body.userId)
        const newPost = new Post(req.body)
        newPost.author = user._id
        const savedPost = await newPost.save()
        user.posts.push(savedPost._id)
        const savedUser = await user.save()
        res.status(200).json({ "message": "saved new post" })
    } catch(err) { res.status(500).json(err) }
}

// get post
const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ "message": "post does not exist" })
        }
    } catch(err) { res.status(500).json(err) }
}

// get all post
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({})
        if (posts) {
            res.status(200).json(posts)
        } else { res.status(404).json({ "message": "there are no posts" }) }
    } catch(err) { res.status(500).json(err) }
}

// update post
const updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body)
        if (updatedPost) {
            res.status(200).json({ "message": "post updated", "post": updatedPost })
        } else { res.status(401).json({ "message": "post does not exist" }) }
    } catch(err) { res.status(500).json(err) }
}

// delete post
const deletePost = async (req, res) => {
    try {
        const postId = req.params.id
        const post = await Post.findById(postId)
        const user = await User.findById(post.author)
        user.posts.pull(postId)
        user.save()
        const deletedPost = await Post.findByIdAndDelete(req.params.id)
        if (deletedPost) {
            res.status(200).json({ "message": "post deleted" })
        } else { res.status(401).json({ "message": "post does not exist" }) }
    } catch(err) { res.status(500).json(err) }
}

module.exports = {
    createPost: createPost,
    getPost: getPost,
    updatePost: updatePost,
    deletePost: deletePost,
    getAllPosts: getAllPosts
}

