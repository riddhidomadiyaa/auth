const express = require("express")
const app = express()
app.use(express.json())
const port = 5002
require("./db/db")
const multer = require("multer")
const path = require("path");
const user = require('./route/users')

app.use("/user", user)


const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads');
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
	}
});

const upload = multer({ storage: storage });

app.post('/upload', upload.array('file', 12), async (req, res) => {
	res.send("img upload")
})
// app.post('/upload',upload.single('file'), async (req, res) => {
// 	res.send("img upload")
// })


app.listen(port, () => {
    console.log(`server started on port ${port}`);
})