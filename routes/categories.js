const router = require("express").Router()
const { createCategory, getCategory, getAllCategories, updateCategory, deleteCategory } = require("../controllers/categoryController") 

router.route("/categories").get(getAllCategories).post(createCategory)
router.route("/categories/:id").get(getCategory).post(updateCategory).put(updateCategory).delete(deleteCategory)


module.exports = router
