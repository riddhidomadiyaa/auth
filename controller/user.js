let User = require("../model/User")
let bcryptjs = require('bcryptjs')
let jwt = require('jsonwebtoken')

exports.signup = async(req, res) => {
    const hashedPassword = await bcryptjs.hash(req.body.password, 8)
    req.body.password = hashedPassword
    const user = await User.create(req.body)
    res.send(user)
}

exports.login = async(req, res) => {
    const user = await User.findOne({email: req.body.email})
    if(!user){
        res.send("user not found")
    }
    let passwordMatch = await bcryptjs.compare(req.body.password, user.password)
    if(!passwordMatch){
        res.send("wrong password")
    }

    let token = jwt.sign({
        _id: user._id,
        email: user.email,
        fname: user.fname,
        lname: user.lname,
        phone: user.phone,
        profileImg: user.profileImg
    }, "riddhi123")

    res.status(200).json({
        message: "login successfull",
        data: token,
    })

}

exports.updateProfile = async(req, res) => {
    let obj = {
        fname: req.body.fname,
        lname: req.body.lname,
        profileImg: req.body.profileImg,
        phone: req.body.phone
    }
    const user = await User.findByIdAndUpdate(req.user._id, obj, {new: true})
    res.status(200).json({
        message: "user updated",
        data: user
    })
}