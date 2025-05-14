const ws = require("ws");

const webServer = new ws.WebSocketServer({
    port: 3001,
});

webServer.on("connection", (socket) => {
    socket.on("message", () =>{
        console.log(`Received message: ${message}`);
    })
})
