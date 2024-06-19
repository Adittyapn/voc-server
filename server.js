const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const PORT = 3001;

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: `http://localhost:3000`,
        methods: ["GET", "POST"]
    },
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("send_message", (message) => {
        console.log(`Received message from ${message.sender}:`, message.text);
        io.emit("receive_message", message);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`)
})