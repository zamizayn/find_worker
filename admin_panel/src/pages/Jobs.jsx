import React, { useState, useEffect } from 'react';
import { getJobs } from '../services/jobService';
import JobCard from '../components/JobCard';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJobs()
      .then(res => setJobs(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="jobs-view">
       <h1 className="view-title">Job Postings</h1>
       {loading ? <p>Loading jobs...</p> : (
         <div className="jobs-grid">
            {jobs.map(job => (
              <JobCard key={job.id} title={job.title} company={job.company} applicants={0} />
            ))}
         </div>
       )}
    </div>
  )
}

export default Jobs;
