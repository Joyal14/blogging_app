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

const signinUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.matchPassword(email, password);
    req.session.userId = user._id;
    console.log('User signed in:', user);
    return res.redirect('/');
  } catch (error) {
    return res.render('signin', { error: error.message });
  }
}

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    return res.redirect('/');
  } catch (error) {
    return res.render('signup', { error: error.message });
  }
};

module.exports = {
  renderHome,
  renderSignin,
  renderSignup,
  signinUser,
  createUser
};


