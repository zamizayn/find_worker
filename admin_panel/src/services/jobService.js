import api from './api';

export const getJobs = () => api.get('/jobs');
export const createJob = (data) => api.post('/jobs', data);
