const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fname: {type: String},
    lname: {type: String},
    email: {type: String, unique: true},
    phone: {type: String},
    password: {type: String},
    profileImg: {type: String},
})

module.exports = mongoose.model("User", userSchema)