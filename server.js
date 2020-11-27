require('dotenv').config("./env");

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const clientRoutes = require("./src/routes/clients")


const app = express()
const port = 30003

app.use(cors())
app.use(bodyParser.json())
app.use("/api/client", clientRoutes)

app.get('/ping', function (req, res) {
    res.status(200).json({msg: "ping"})
})

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});

