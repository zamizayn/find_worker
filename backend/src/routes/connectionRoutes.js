const express = require('express');
const router = express.Router();
const connectionController = require('../controllers/connectionController');
const auth = require('../middleware/auth');

router.post('/request', auth, connectionController.sendRequest);
router.put('/respond', auth, connectionController.respondToRequest);
router.get('/', auth, connectionController.getConnections);

module.exports = router;
