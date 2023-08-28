const app = require('express');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    socket.on('send', (payload) => {
        socket.broadcast.emit('broadcast', payload)
    });
    socket.on('disconnect', () => {
        console.log('Connection closed');
    })
})

server.listen(3001, () => {
    console.log('Listening...')
})