import React from 'react';
import DOMPurify from 'dompurify';
import './index.css';

const WikiPage = ({ title, html }) => (
  <div className="WikiPage">
    <h1 className="WikiPage--title">{title ? title : 'No Page Title'}</h1>
    <div
      className="WikiPage--content"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
    />
  </div>
);

export default WikiPage;
