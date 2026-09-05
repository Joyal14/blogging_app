const { Router } = require('express');
const router = Router();
const {
	renderHome,
	renderSignin,
	renderSignup,
	createUser,
	signinUser
} = require('../controllers/user');

router.get('/', renderHome);
router.get('/signin', renderSignin);
router.get('/signup', renderSignup);
router.post('/signin', signinUser);
router.post('/signup', createUser);
module.exports = router;