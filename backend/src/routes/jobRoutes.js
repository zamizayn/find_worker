const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const auth = require('../middleware/auth');

router.post('/', auth, jobController.createJob);
router.get('/', auth, jobController.getJobs);
router.post('/:jobId/apply', auth, jobController.applyToJob);
router.get('/applications', auth, jobController.getApplications);

module.exports = router;
