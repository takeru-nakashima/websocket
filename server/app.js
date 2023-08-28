const app = require('express');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
require('dotenv').config();

const PORT = process.env.WEBSOCKET_SERVER_PORT || 3003;
console.log(PORT)

io.on('connection', (socket) => {
    socket.on('send', (payload) => {
        console.log(`receive send event ${payload} and broadcast`)
        socket.broadcast.emit('broadcast', payload)
    });
    socket.on('disconnect', () => {
        console.log('Connection closed');
    })
})

server.listen(PORT, () => {
    console.log('Listening...')
})