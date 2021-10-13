const User = require("../models/User")
const Post = require("../models/Post")
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
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body )
        if (updatedUser) {
            res.status(200).json({ "message": "update successful" })
        } else { res.status(401).json({ "message": "update Unsuccessful" }) }
    } catch (err) { 
        res.status(500).json(err)
    }
}

// delete user
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        if (deletedUser) {
            res.status(200).json({ "message": "user deleted" })
        } else { res.status(401).json({ "message": "delete unsuccessful" }) }
    } catch (err) { 
        res.status(500).json(err)
    }
}

// get user
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (user) {
            const { password, ...others } = user._doc
            res.status(200).json(others)
        } else { res.status(404).json({ "message": "user does not exist" }) }
    } catch (err) { res.status(500).json(err) }
}

// get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        if (users) {
            newUsers = users.map(user => {
                const { password, ...others } = user._doc
                return others
            })

            res.status(200).json(newUsers)
        } else { res.status(200).json({ "message": "there are no users" }) }
    } catch(err) { res.status(500).json(err) }
}

module.exports = { 
    signup: signup,
    login: login,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getUser: getUser,
    getAllUsers: getAllUsers
}

