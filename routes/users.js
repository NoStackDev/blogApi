const router = require("express").Router()
const { updateUser, deleteUser, getUser } = require("../controllers/userController")

router.route('/users/:id').get(getUser).put(updateUser).post(updateUser).delete(deleteUser)

module.exports = router
