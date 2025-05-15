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
   // console.log(`User ${socket.id} connected`);

    // At connection - only to current user
    socket.emit("message", "Welcome to the chat");

    // At connectio - to all user
    socket.broadcast.emit("message", `User ${socket.id.substring(0, 5)} connected`)

    // When Disconnection 
    socket.on('disconnect', () =>{
        socket.broadcast.emit("message", `User ${socket.id.substring(0, 5)} disconnected`)
    })
   
    // capturing the activity event
    socket.on("activity", (name) => {
        console.log(name);
        socket.broadcast.emit("activity", name);
    })

    socket.on("message", (data) =>{
        console.log(`Received message from client: ${data}`);
        io.emit("message",`${socket.id.substring(0, 5)} : ${data}`);
    })
})


io.on("close", () =>{
    console.log('Connection closed');
});