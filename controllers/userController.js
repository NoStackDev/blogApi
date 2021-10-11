const User = require("../models/User")
const bcrypt = require("bcrypt")


// signup user
const signup = async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({ ...req.body, password: hash })
        const user = await newUser.save()
        const { password, ...others } = user._doc
        res.status(200).json({ "message": "success", ...others })
    } catch (err) {
        res.status(500).json(err)
    }
}

// login user
const login = async (req, res) => {
    try { 
        const foundUser = await User.findOne({ email: req.body.email })
        if (foundUser && await bcrypt.compare(req.body.password, foundUser.password)) {
            const { password, ...others } = foundUser._doc
            res.status(200).json({ "message": "success", ...others })
        } else {
            res.status(404).json({ "message": "email or password is incorrect" })
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

// update user
const updateUser = async (req, res) => {
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10)
        }
        const updatedUser = User.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({ "message": "success" })
    } catch (err) { console.log(err) }
}

module.exports = { 
    signup: signup,
    login: login,
    updateUser: updateUser
}

