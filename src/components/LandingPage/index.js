// @flow
import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

const LandingPage = () => (
  <div className="LandingPage">
    <h1 className="LandingPage__title">react-wikivoyage</h1>
    <div className="LandingPage__content">
      <p>A React client view for Wikivoyage.</p>
      <p>
        Try any place on Earth in the search bar above. For example:{' '}
        <Link to="/wiki/bogota">Bogotá</Link> or{' '}
        <Link to="/wiki/madagascar">Madagascar</Link> or{' '}
        <Link to="/wiki/antarctica">Antarctica</Link>
      </p>
      <p>
        This is an early stage development project. It is missing features
        essential to a usable Wikivoyage client.
      </p>
      <p>
        View the{' '}
        <a href="https://github.com/warrenwhipple/react-wikivoyage">
          GitHub repo
        </a>.
      </p>
    </div>
  </div>
);

export default LandingPage;
