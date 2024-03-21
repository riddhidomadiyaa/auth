const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://riddhi_domadiya:xrEbj3xPE059NKBP@riddhi.hlb9k1d.mongodb.net/interview_auth")
.then(()=> {
    console.log("connection successfully");
})
.catch((e)=> {
    console.log(e, "error");
})