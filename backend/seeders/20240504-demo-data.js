'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Seed Users
    const users = await queryInterface.bulkInsert('Users', [
      {
        email: 'john@example.com',
        password: hashedPassword,
        role: 1, // Candidate
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'admin@findworker.com',
        password: hashedPassword,
        role: 3, // Admin
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'recruiter@techcorp.com',
        password: hashedPassword,
        role: 2, // Business
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });

    // Seed Profiles
    await queryInterface.bulkInsert('Profiles', [
      {
        userId: users[0].id,
        firstName: 'John',
        lastName: 'Doe',
        headline: 'Senior Flutter Developer',
        bio: 'Passionate about building beautiful cross-platform apps.',
        location: 'San Francisco, CA',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: users[2].id,
        firstName: 'Jane',
        lastName: 'Recruiter',
        headline: 'Talent Acquisition at TechCorp',
        bio: 'Always looking for the best talent in engineering.',
        location: 'New York, NY',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Seed Jobs
    await queryInterface.bulkInsert('Jobs', [
      {
        title: 'Senior Software Engineer',
        company: 'TechCorp',
        location: 'Remote',
        description: 'Looking for a full-stack expert in Node.js and React.',
        requirements: '5+ years experience, Strong JavaScript skills.',
        salaryRange: '$120k - $160k',
        jobType: 'Full-time',
        authorId: users[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Backend Developer',
        company: 'FastScale',
        location: 'Austin, TX',
        description: 'Join our team to build high-performance APIs.',
        requirements: 'Node.js, PostgreSQL, Redis.',
        salaryRange: '$100k - $130k',
        jobType: 'Full-time',
        authorId: users[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Jobs', null, {});
    await queryInterface.bulkDelete('Profiles', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
