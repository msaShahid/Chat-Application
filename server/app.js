const ws = require("ws");
const http = require("http");

const httpServer = http.createServer();

httpServer.listen(3001);

const webServer = new ws.WebSocketServer({
    //port: 3001,
    server: httpServer,
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