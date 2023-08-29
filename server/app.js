const app = require('express');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
require('dotenv').config();

const PORT = process.env.WEBSOCKET_SERVER_PORT || 3003;
console.log(PORT)

let roomId = '';

io.on('connection', (socket) => {
    socket.on('send', (payload) => {
        socket.to(roomId).emit('sendSpecificRoom', payload)
    });
    
    socket.on('joinRoom', (message) => {
        console.log(message.roomId+"に入室しました。")
        roomId = message.roomId;
        socket.join(message.roomId)
    })

    socket.on('disconnect', () => {
        console.log('Connection closed');
    })
})

server.listen(PORT, () => {
    console.log('Listening...')
})