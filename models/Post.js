const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: false
    }],
}, { timestamps: true })


module.exports = mongoose.model("Post", PostSchema)

