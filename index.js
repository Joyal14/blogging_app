const Path = require('path');
const express = require('express');
const app = express();
const PORT = 8000;
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');

const mongoose = require('mongoose');
const userRouter = require('./routes/user');
app.set('view engine', 'ejs');
app.set('views', Path.resolve(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));

mongoose
  .connect('mongodb://localhost:27017/blogging_app')
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
