const { Router } = require('express');
const { apiSigninUser, apiCreateUser } = require('../controllers/user');

const router = Router();

router.post('/signin', apiSigninUser);
router.post('/signup', apiCreateUser);

module.exports = router;