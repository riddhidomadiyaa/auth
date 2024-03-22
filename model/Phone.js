const mongoose = require("mongoose")

const phoneSchema = new mongoose.Schema({
    userId: {type: String},
    name: {type: String},
    description: {type: String, unique: true},
    images: [{
        image: {type: String}
    }],
    sgst: {type: Number},
    cgst: {type: Number},
    sizes: [{
        size: {type: String},
        price: {type: Number},
    }],
    status: {type: String},
},{timestamps: true})

module.exports = mongoose.model("Phone", phoneSchema)