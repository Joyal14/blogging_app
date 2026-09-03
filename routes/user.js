const { Router } = require('express');
const router = Router();
const { renderHome, renderSignin, renderSignup, createUser } = require('../controllers/user');

router.get('/', renderHome);
router.get('/signin', renderSignin);
router.get('/signup', renderSignup);
router.post('/signup', createUser);
module.exports = router;