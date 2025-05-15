import {Server} from "socket.io";
import express from "express";

const app = express();

const PORT = process.env.PORT || 3001;

const httpServer = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

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