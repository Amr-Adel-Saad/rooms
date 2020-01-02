const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');
const cors = require('cors');

const { addUser, getUser, removeUser, getUsersInRoom } = require('./users.js');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

io.on('connection', (socket) => {
    socket.on('join', ({name, room}, callback) => {
        const {error, user} = addUser({id: socket.id, name, room});

        if (error) return callback(error);

        socket.emit('message', {user: 'admin', text: `${user.name}, Welcome to the room`});
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} joined the room`});

        socket.join(user.room);

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', {user: user.name, text: message});
        }

        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        
        if (user) {
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
    });
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'client', 'build')));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
};

server.listen(PORT, () => { console.log(`Server started on port ${PORT}`) });