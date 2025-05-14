const ws = require("ws");

const webServer = new ws.WebSocketServer({
    port: 3001,
});

webServer.on("connection", (socket) => {
    console.log('Connection established');
    socket.on("message", (data) =>{
        console.log(`Received message from client: ${data}`);
        socket.send(`${data}`);
    })
})


webServer.on("close", () =>{
    console.log('Connection closed');
});