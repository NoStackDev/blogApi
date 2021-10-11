const router = require("express").Router()
const { signUp } = require("../controllers/userController")


router.post("/register", signUp)


module.exports = router
