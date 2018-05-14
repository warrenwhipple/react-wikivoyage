import React from 'react';
import './index.css';

const LandingPage = () => (
  <div className="LandingPage">
    <h1 className="LandingPage--title">Pretty Wikivoyage</h1>
    <div className="LandingPage--content">
      A web application client view for{' '}
      <a href="https://wikivoyage.org">Wikivoyage</a>.
    </div>
  </div>
);

export default LandingPage;
