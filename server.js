const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const url = `${process.env.VERCEL_URL || 'http://localhost:3001'}`;
const port = process.env.VERCEL_HTTPS_PORT || 3001;

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: `https://voc-two.vercel.app`,
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

server.listen(port, () => {
    console.log(`Server running on ${url}`);
});