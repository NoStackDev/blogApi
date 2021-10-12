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
        const message = JSON.stringify({ "message": `saved new post from ${savedUser.username}` }) 
        res.status(200).json(message)
    } catch(err) { res.status(500).json(err) }
}


module.exports = {
    createPost: createPost
}

