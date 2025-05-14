const {Server} = require('socket.io');
const http = require("http");

const httpServer = http.createServer();

httpServer.listen(3001);

const io = new  Server(httpServer, {
    cors: {
        origin: "*",
    }
});

io.on("connection", (socket) => {
    console.log(`User ${socket.id} connected`);

    socket.on("message", (data) =>{
        console.log(`Received message from client: ${data}`);
        io.emit("message",`${socket.id.substring(0, 5)} : ${data}`);
    })
})


io.on("close", () =>{
    console.log('Connection closed');
});