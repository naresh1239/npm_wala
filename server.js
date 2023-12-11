require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server,{
    cors : {origin : "*"}
});

const PORT = process.env.PORT || 3002;

app.get("/",(req,res)=>{
    res.send("hii i am here live")
})
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('sendChatToServer', (message) => {
        io.emit('sendChatToClient', message);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
