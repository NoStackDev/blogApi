const User = require("../models/User")
const bcrypt = require("bcrypt")


// signup user
const signup = async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({ ...req.body, password: hash })
        const user = await newUser.save()
        const {password, ...others} = user._doc
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
}

// login user
const login = async (req, res) => {
    try { 
        const foundUser = await User.findOne({ email: req.body.email })
        if (foundUser && await bcrypt.compare(req.body.password, foundUser.password)) {
            const {password, ...others} = foundUser._doc
            res.status(200).json(others)
        } else {
            res.status(404).json({ "message": "email or password is incorrect" })
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = { 
    signup: signup,
    login: login
}
