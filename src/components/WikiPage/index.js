import React from 'react';
import './index.css';

const WikiPage = ({ pageId }) => (
  <div className="WikiPage">{pageId ? 'Page ID: ' + pageId : 'No page ID'}</div>
);

export default WikiPage;
