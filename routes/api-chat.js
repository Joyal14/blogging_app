const { Router } = require('express');
const { getMessages, createMessage } = require('../controllers/chat');

const router = Router();

router.get('/messages', getMessages);
router.post('/messages', createMessage);

module.exports = router;