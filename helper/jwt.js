let jwt = require("jsonwebtoken");
const User = require("../model/User");

exports.userJwt = async(req, res, next) => {
    if(!req.headers.authorization){
        res.status(401).json({
            message: "unauthorized."
        })
    }
    let verify = jwt.verify(req.headers.authorization, "riddhi123")
    let user = await User.findById(verify._id)
    req.user = user
    return next()
}