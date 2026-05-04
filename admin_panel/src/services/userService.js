import api from './api';

export const getProfiles = () => api.get('/profiles');
export const getProfileById = (id) => api.get(`/profiles/${id}`);
