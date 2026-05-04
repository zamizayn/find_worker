const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const auth = require('../middleware/auth');
const upload = require('../utils/fileUpload');

router.get('/me', auth, profileController.getProfile);
router.get('/:userId', profileController.getProfile);
router.put('/', auth, upload.single('image'), profileController.updateProfile);

module.exports = router;
