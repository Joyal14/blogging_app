const User = require('../models/user');

const renderHome = (req, res) => {
  res.render('home');
};

const renderSignin = (req, res) => {
  res.render('signin');
};

const renderSignup = (req, res) => {
  res.render('signup');
};

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    return res.redirect('/user/');
  } catch (error) {
    return res.render('signup', { error: error.message });
  }
};

module.exports = {
  renderHome,
  renderSignin,
  renderSignup,
  createUser
};


