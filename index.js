const express = require("express")
const app = express()
app.use(express.json())
const port = process.env.PORT || 80
require("./db/db")

app.get('/', async (req, res) => {
	res.send("backend api run on server...");
});

app.listen(port, () => {
    console.log(`server started on port ${port}`);
})