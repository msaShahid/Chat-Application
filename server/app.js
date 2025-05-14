const ws = require("ws");

const webServer = new ws.WebSocketServer({
    port: 3001,
});

webServer.on("connection", (socket) => {
    console.log('Connection is running');
    socket.on("message", () =>{
        console.log(`Received message: ${message}`);
    })
})
