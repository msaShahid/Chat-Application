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

})


io.on("close", () =>{
    console.log('Connection closed');
});