import React from 'react';

function JobCard({ title, company, applicants }) {
   return (
      <div className="grid-card">
         <h4 style={{margin: '0 0 8px 0'}}>{title}</h4>
         <p style={{margin: '0 0 16px 0', fontSize: '0.9rem', color: '#64748b'}}>{company}</p>
         <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <span style={{fontSize: '0.8rem', color: '#94a3b8'}}>{applicants} applicants</span>
            <button className="view-btn" style={{padding: '6px 12px', background: '#f1f5f9', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>View</button>
         </div>
      </div>
   )
}

export default JobCard;
