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
    const token = await User.matchPasswordAndCreateToken(email, password);
   
    console.log('User signed in:', token);
    return res.cookie('token', token, { httpOnly: true }).redirect('/');
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

const apiSigninUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await User.matchPasswordAndCreateToken(email, password);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

const apiCreateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  renderHome,
  renderSignin,
  renderSignup,
  signinUser,
  createUser,
  apiSigninUser,
  apiCreateUser
};


