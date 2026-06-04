require('dotenv').config();

const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const db = require('./src/config/config');

const middleware = require('./src/middlewares/auth.middlewares.js');

const aiRouter = require('./src/AI/ai.router.js');

const chatRoutes = require('./src/Router/chatRoutes.js');

const app = express();

const port = process.env.PORT || 3001;

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.get('/', (req, res) => {
  res.send('HR Smart API Server đang hoạt động ổn định!');
});

// SOCKET
app.use('/api/chat', chatRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

// Cắt bỏ hết phần gọi chatController hay lưu DB, chỉ giữ lại logic Socket thuần túy:

io.on('connection', (socket) => {
  console.log('Đã kết nối Socket:', socket.id);

  // Lắng nghe sự kiện gửi tin nhắn realtime từ Frontend
  socket.on('send_message', (data) => {
    // Tự động tạo ID tin nhắn và mốc thời gian ngay tại Server
    const messagePayload = {
      MaTinNhan: Math.floor(Math.random() * 100000), // Tạo ID ngẫu nhiên cho bản demo
      MaNguoiGui: data.MaNguoiGui,
      MaNguoiNhan: data.MaNguoiNhan,
      NoiDung: data.NoiDung,
      NgayGui: new Date().toISOString(),
    };

    console.log('✉️ Đang phát tin nhắn cho các máy:', messagePayload);

    // Phát thẳng tin nhắn này cho TẤT CẢ các tab đang kết nối
    io.emit('receive_message', messagePayload);
  });

  socket.on('disconnect', () => {
    console.log('Ngắt kết nối Socket:', socket.id);
  });
});

app.use('/api/ai', aiRouter);

app.use('/api', require('./src/Router'));
app.use(middleware);

server.listen(port, () => {
  console.log(
    `🚀 Server đang chạy tại:
http://localhost:${port}`,
  );
});
