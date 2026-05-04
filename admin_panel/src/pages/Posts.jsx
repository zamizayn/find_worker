import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { getFeed } from '../services/postService';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeed()
      .then(res => setPosts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="posts-view">
      <h1 className="view-title">Post Management</h1>
      <div className="grid-card">
        <h3>Recent Platform Activity</h3>
        <div className="post-table">
           {loading ? <p>Loading feed...</p> : posts.map((post, i) => (
             <div key={post.id || i} className="user-row">
               <div className="user-details">
                 <span className="user-name">User ID: {post.userId}</span>
                 <span className="user-role" style={{maxWidth: '500px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                   {post.content}
                 </span>
               </div>
               <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                 <span className="row-date">{new Date(post.createdAt).toLocaleDateString()}</span>
                 <Trash2 size={18} className="text-red-500 cursor-pointer" />
               </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
