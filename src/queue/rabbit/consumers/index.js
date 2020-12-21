const {closeOnErr, processMsg} = require("./utils")

async function channelConsume(conn){
    conn.createChannel(function(err, ch) {
        if (closeOnErr(err)) return;
        ch.on("error", function(err) {
            console.error("[AMQP] channel error", err.message);
        });
        ch.on("close", function() {
            console.log("[AMQP] channel closed");
        });

        ch.prefetch(10);
        createClientQueue(conn, ch)
    });
}

function createClientQueue (conn, ch){
    console.log(process.env.CREATE_CLIENT_QUEUE)
    ch.assertQueue(process.env.CREATE_CLIENT_QUEUE, { durable: true }, function(err, _ok) {
        if (closeOnErr(err)) return;
        ch.consume(process.env.CREATE_CLIENT_QUEUE, processMsg(conn, ch, createClientWorker), { noAck: false });
        console.log("Worker is started");
    });

}

function createClientWorker(msg, cb) {
    console.log(msg.content.toString())
    require("../../../controller/clients").addClient(JSON.parse(msg.content.toString())).then(()=>{
        cb(true);
    })
}

module.exports ={
    channelConsume
}
