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

// * * * * *
// *       *
// *       *
// *       *
// * * * * *

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
        if(k%2 == 0){
            str += 0 + " "
        } else {
            str += 1 + " "
        }
        // str += "*"
    }
    str += "\n"
}
console.log(str);

let string = ""
for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
        if(i == 1  || i == 5 || j == 1 || j == 5){
            string += "* "
        } else {
            string += "  "
        }
    }
    string += "\n"
}
console.log(string);

let arr2 = [4, 2, 8, 5, 6]
let max = 0
for (let i = 0; i < arr2.length; i++) {
    if(arr2[i] > max){
        max = arr2[i]
    }
}
console.log(max, "max");

let min = arr2[0]
for (let i = 0; i < arr2.length; i++) {
    if(arr2[i] < min){
        min = arr2[i]
    }
}
console.log(min, "min");

let total = 0
for (let i = 0; i < arr2.length; i++) {
   total += arr2[i]
}
console.log(total, "total");

let even = []
let odd = []
for (let i = 0; i < arr2.length; i++) {
    if(arr2[i]%2 == 0){
        even.push(arr2[i])
    } else {
        odd.push(arr2[i])
    }
}
console.log(even, "even");
console.log(odd, "odd");

let arrobj = [{a: 5, d: 10}, {b: 2}, {c: 15}]
let total1 = 0
for (let i = 0; i < arrobj.length; i++) {
    let obj = arrobj[i]
    for(let a in obj){
        total1 += obj[a]
    }
}
console.log(total1, "total1");

let max1 = 0
for (let i = 0; i < arrobj.length; i++) {
    let obj = arrobj[i]
    for(let a in obj){
        if(obj[a] > max1){
            max1 = obj[a]
        }
    }
}
console.log(max1, "max1");

let min1 = arrobj[0].a
for (let i = 0; i < arrobj.length; i++) {
    let obj = arrobj[i]
    for(let a in obj){
        if(obj[a] < min1){
            min1 = obj[a]
        }
    }
}
console.log(min1, "min1");