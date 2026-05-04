const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const auth = require('../middleware/auth');

router.post('/', auth, messageController.sendMessage);
router.get('/conversations', auth, messageController.getConversationList);
router.get('/:contactId', auth, messageController.getMessages);

module.exports = router;
