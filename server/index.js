const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path')

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

let count = 0;

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.emit('updateCount', count);

  const intervalId = setInterval(() => {
    count++;
    socket.emit('updateCount', count);
  }, 1000);


});

server.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
