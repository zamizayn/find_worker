const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');

router.post('/', auth, postController.createPost);
router.get('/feed', auth, postController.getFeed);
router.post('/:postId/like', auth, postController.likePost);
router.post('/:postId/comment', auth, postController.commentPost);

module.exports = router;
