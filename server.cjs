const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // URL của React client
    methods: ['GET', 'POST'],
  },
});

// Lắng nghe kết nối từ client
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Nhận tin nhắn từ client và phát tới các client khác
  socket.on('send_message', (message) => {
    io.emit('receive_message', message);
  });

  // Xử lý khi user ngắt kết nối
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(4000, () => {
  console.log('Server is running on port 4000');
});
