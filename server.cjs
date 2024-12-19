const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // React client
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  },
});

let userSocketMap = {}; // Lưu trữ mapping giữa userId và socketId

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Lắng nghe sự kiện gán userId cho socket
  socket.on('register', (userId) => {
    userSocketMap[userId] = socket.id;
    console.log(`User registered: ${userId} -> ${socket.id}`);
  });

  // Nhận và phát tin nhắn
  socket.on('sendMessage', ({ senderId, receiverId, messageContent }) => {
    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      // Gửi tin nhắn tới người nhận
      io.to(receiverSocketId).emit('receiveMessage', {
        senderId,
        receiverId,
        messageContent,
        isSender: false,
      });
    }

    // Gửi lại cho người gửi để hiển thị tin nhắn của chính họ
    socket.emit('receiveMessage', {
      senderId,
      receiverId,
      messageContent,
      isSender: true,
    });
  });

  // Xử lý ngắt kết nối
  socket.on('disconnect', () => {
    for (const [userId, socketId] of Object.entries(userSocketMap)) {
      if (socketId === socket.id) {
        delete userSocketMap[userId];
        break;
      }
    }
    console.log('User disconnected:', socket.id);
  });
});

server.listen(4000, () => {
  console.log('Server is running on port 4000');
});
