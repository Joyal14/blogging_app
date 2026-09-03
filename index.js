const Path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

const mongoose = require('mongoose');
const User = require('./models/user');
app.set('view engine', 'ejs');
app.set('views',Path.resolve("./views"));

mongoose
  .connect('mongodb://localhost:27017/blogging_app')
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
  });

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
