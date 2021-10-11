const router = require("express").Router()
const { updateUser } = require("../controllers/userController")

router.route('/user/:id').put(updateUser).post(updateUser)

module.exports = router
