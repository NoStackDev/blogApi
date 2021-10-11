const User = require("../models/User")


// signup user
const signUp = async (req, res) => {
    console.log(req.body)
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        console.log(newUser)
        res.status(200).json(newUser)
    } catch (err) {
        res.status(500).json(err)
    }
}


module.exports = { signUp: signUp }
