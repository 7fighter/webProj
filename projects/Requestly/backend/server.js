// server.js (modified)
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const requestRoutes = require('./routes/requestRoutes');
const dealRoutes = require('./routes/dealRoutes');
const chatRoutes = require('./routes/chatRoutes');
const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/deals', dealRoutes);
app.use('/api/chat', chatRoutes);

// 🧠 Socket.IO logic
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinRoom', ({ dealId }) => {
    socket.join(`deal_${dealId}`);
    console.log(`User joined room: deal_${dealId}`);
  });

  socket.on('chatMessage', async ({ dealId, senderId, message }) => {
    const newMsg = new Message({ dealId, senderId, message });
    await newMsg.save();

    io.to(`deal_${dealId}`).emit('newMessage', {
      message: newMsg.message,
      senderId: newMsg.senderId,
      timestamp: newMsg.timestamp,
      _id: newMsg._id
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.error(err));
