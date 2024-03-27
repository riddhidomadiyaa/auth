let User = require("../model/User")
let Phone = require("../model/Phone")
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

exports.createPhone = async(req, res) => {
    req.body.userId = req.user._id
    const user = await Phone.create(req.body)
    res.status(200).json({
        message: "user updated",
        data: user
    })
}

exports.updatesize = async(req, res) => {
    const phone1 = await Phone.findOneAndUpdate({_id: req.body.id, "sizes.size": 8}, {"sizes.$.size": 12}, {new: true})
    res.status(200).json({
        message: "user updated",
        data: phone1
    })
}

exports.getdata = async(req, res) => {
    let currentPage = req.body.currentPage
    let limit = req.body.limit
    
    let phone = await Phone.find({userId: req.user._id})
    phone =  phone.map(item => {
        item.sizes = item.sizes.filter(sizes => sizes.size > 7 && sizes.size < 15);
        return item;
    }).filter(item => item.sizes.length > 0);

    const skip = limit * (currentPage - 1);
    const records = phone.slice(skip, skip + limit);
    const totalPages = Math.ceil(phone.length / limit);

    res.status(200).json({
        message: "user get",
        data: { records, currentPage, totalPages }
    })
}

const data = {
    type: "b",
    data: [
        {
            type: "a",
            name: "a",
        },
        {
            type: "a",
            name: "b",
        },
        {
            type: "b",
            data: [
                {
                    type: "a",
                    name: "c",
                },
                {
                    type: "a",
                    name: "d",
                },
                {
                    type: "b",
                    data: [
                        {
                            type: "a",
                            name: "e",
                        },
                        {
                            type: "a",
                            name: "f",
                        },
                        {
                            type: "a",
                            name: "g",
                        },
                        {
                            type: "a",
                            name: "h",
                        },
                        {
                            type: "b",
                            data: [
                                {
                                    type: "a",
                                    name: "i",
                                },
                                {
                                    type: "a",
                                    name: "j",
                                },
                                {
                                    type: "a",
                                    name: "k",
                                },
                                {
                                    type: "a",
                                    name: "l",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};


function data1(data){
    let names = []
    if(data.name){
        names.push(data.name)
    }
    if(data.data && Array.isArray(data.data)){
        data.data.forEach((item) => {
            names = names.concat(data1(item))
        })
    }
    return(names)
}
let name = data1(data)
// console.log(name, "=====");


// map vs filter
// map condition true hoi to boolean value return kre che 
// filter condition true hoi to data return kre che


let arr = ["riya", "tiya", "jiya"]
let arr1 = arr.push("riddhi")
// let arr1 = arr.pop()
// let arr1 = arr.shift()
// let arr1 = arr.unshift("riddhi")
console.log(arr, "==");

var a = 10;
var b = 20;
[a, b] = [b, a];
console.log("a =", a); // Output: a = 20
console.log("b =", b); // Output: b = 10


// * * * * *
// * * * *
// * * *
// * *
// *

// * * * * *
//   * * * *
//     * * *
//       * *
//         *

let n = 5

var st = ""
for (let i = n; i >= 1; i--) {
    for (let j = 1; j <= i; j++) {
        st += "* "
    }
    st += "\n"
}
console.log(st);

let str = ""
for (let i = n; i >= 1; i--) {
    for (let j = 1; j <= n-i; j++) {
       str += " "
        
    }
    for (let k = 1; k <= i; k++) {
        str += "*"
    }
    str += "\n"
}
console.log(str);