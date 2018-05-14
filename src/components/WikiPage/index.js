import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import './index.css';

const WikiPage = ({ title, html }) => (
  <div className="WikiPage">
    <h1 className="WikiPage--title">{title ? title : 'No Page Title'}</h1>
    <div className="WikiPage--content">
      {html ? ReactHtmlParser(html) : 'No page text.'}
    </div>
  </div>
);

export default WikiPage;
