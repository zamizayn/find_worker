const { Job, Application, User, Profile } = require('../../models');

exports.createJob = async (req, res) => {
  try {
    const { title, company, location, description, requirements, salaryRange, jobType } = req.body;
    const job = await Job.create({
      authorId: req.user.id,
      title,
      company,
      location,
      description,
      requirements,
      salaryRange,
      jobType
    });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll({
      include: [
        { 
          model: User, 
          as: 'recruiter', 
          attributes: ['email'],
          include: [{ model: Profile, as: 'profile', attributes: ['firstName', 'lastName', 'avatarUrl'] }]
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { resumeUrl, coverLetter } = req.body;
    
    const existingApplication = await Application.findOne({
      where: { userId: req.user.id, jobId }
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    const application = await Application.create({
      userId: req.user.id,
      jobId,
      resumeUrl,
      coverLetter
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.findAll({
      where: { userId: req.user.id },
      include: [{ model: Job, as: 'job' }]
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
