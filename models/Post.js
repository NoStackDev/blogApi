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
    username: {
        type: String,
        required: false
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
        required: false
    }],
}, { timestamps: true })


module.exports = mongoose.model("Post", PostSchema)

