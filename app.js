require('dotenv').config();
const Path = require('path');
const express = require('express');
const app = express();
const {Server} = require('socket.io');
const { validateToken } = require('./services/authentication');

const PORT = process.env.PORT || 8000;
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const server = require('http').createServer(app);
const io = new Server(server);
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');
const apiUserRouter = require('./routes/api-user');
const apiBlogRouter = require('./routes/api-blog');
const apiCommentRouter = require('./routes/api-comment');
const apiChatRouter = require('./routes/api-chat');
const ChatMessage = require('./models/chat-message');
app.set('view engine', 'ejs');
app.set('views', Path.resolve(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(Path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));

io.use((socket, next) => {
  const cookies = socket.handshake.headers.cookie || '';
  const cookieToken = cookies
    .split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith('token='))
    ?.slice('token='.length);
  const token = socket.handshake.auth?.token || cookieToken;

  if (!token) {
    return next(new Error('Authentication required'));
  }

  try {
    socket.user = validateToken(decodeURIComponent(token));
    return next();
  } catch (error) {
    return next(new Error('Invalid authentication token'));
  }
});

io.on('connection', (socket) => {
  ChatMessage.find()
    .sort({ createdAt: -1 })
    .limit(100)
    .lean()
    .then((messages) => socket.emit('chat:history', messages.reverse()))
    .catch((error) => console.error('Chat history failed:', error.message));

  socket.broadcast.emit('chat:system', `${socket.user.username} joined the chat`);

  socket.on('chat:message', async (message) => {
    const text = typeof message === 'string' ? message.trim() : '';
    if (!text || text.length > 500) return;

    try {
      const savedMessage = await ChatMessage.create({
        sender: socket.user.id,
        username: socket.user.username,
        text,
      });
      io.emit('chat:message', savedMessage);
    } catch (error) {
      socket.emit('chat:error', 'Message could not be saved');
    }
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('chat:system', `${socket.user.username} left the chat`);
  });
});

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blogging_app')
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
  });

app.get('/', (req, res) => {
  res.render('home',{ user: req.user || null});
});

app.use('/user', userRouter);
app.use('/api/user', apiUserRouter);
app.use('/blog',blogRouter);
app.use('/api/blog', apiBlogRouter);
app.use('/api/comment', apiCommentRouter);
app.use('/api/chat', apiChatRouter);
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
