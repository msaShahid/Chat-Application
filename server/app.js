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
    console.log(`User ${socket.id.substring(0, 5)} connected`);

    socket.on("user_join_room", (data) => {
        const {username, roomId} = data || {};
       
        socket.join(roomId);
        console.log(`User ${username} joined room ${roomId}`);
    })
})


io.on("close", () =>{
    console.log('Connection closed');
});