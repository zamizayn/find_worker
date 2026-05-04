import api from './api';

export const getFeed = () => api.get('/posts/feed');
export const deletePost = (id) => api.delete(`/posts/${id}`);
