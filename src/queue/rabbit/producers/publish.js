const {publish} = require("./index")

function sendEmail(email) {
    publish("", process.env.NOTIFY_QUEUE, Buffer.from(JSON.stringify({email})))
}

module.exports = {
    sendEmail,
}
