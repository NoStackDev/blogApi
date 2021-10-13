const Category = require('../models/Category')
const Post = require('../models/Post')


// create a category 
const createCategory = async (req, res) => {
    try {
        const category = new Category(req.body)
        const savedCategory = await category.save()
        res.status(200).json(savedCategory)
    } catch(err) { res.status(500).json(err) }
}


// get a category
const getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        if (category) {
            res.status(200).json(category)
        } else { res.status(400).json({ "message": "category does not exist" }) }
    } catch(err) { res.status(500).json(err) }
}

// get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({})
        if (categories.length !== 0) {
            res.status(200).json(categories)
        } else { res.status(400).json({ "message": "there are no categories" }) }
    } catch(err) { res.status(200).json(err) }
}

// update category
const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body)
        if (updatedCategory) {
            res.status(200).json({ "message": "updated category" })
        } else { res.status(400).json({ "message": "category does not exist" }) }
    } catch(err) { res.status(500).json(err) }
}

// delete category
const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id)
        if (deletedCategory) {
            const categoryId = deletedCategory._id
            const posts = await Post.find({ categories : { $in: [categoryId] } })
            if (posts.length !== 0) {
                posts.forEach( post => {
                    post.categories.pull(categoryId)
                    post.save()
                })
            }
            res.status(200).json({ "message": "category deleted" })
        } else { res.status(400).json({ "message": "category does not exist" }) }
    } catch(err) { res.status(500).json(err) }
}


module.exports = { 
    createCategory,
    getCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
}
