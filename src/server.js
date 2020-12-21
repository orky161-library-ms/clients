require('dotenv').config("./env");
const {createRabbitConnection} = require("./config/index")

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const clientRoutes = require("./routes/clients")
const {checkConnection} = require("./dal/clients")

const app = express()
const port = 30003

app.use(cors())
app.use(bodyParser.json())
app.use("/api/client", clientRoutes)

app.get('/ping', function (req, res) {
    res.status(200).json({msg: "ping"})
})

app.get('/health', async function (req, res) {
    await checkConnection()
    res.status(200).json({msg: "health"})
})

app.listen(port, () => {
    createRabbitConnection()
    console.log(`app listening at http://localhost:${port}`);
});

