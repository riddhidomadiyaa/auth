const express = require('express')
const router = express.Router()
const usercontroller = require('../controller/user')
const {userJwt} = require("../helper/jwt")

router.post("/signup", usercontroller.signup)
router.post("/login", usercontroller.login)


router.post("/updateProfile", userJwt, usercontroller.updateProfile)
router.post("/createPhone", userJwt, usercontroller.createPhone)
router.post("/updatesize", userJwt, usercontroller.updatesize)
router.post("/getdata", userJwt, usercontroller.getdata)

module.exports = router