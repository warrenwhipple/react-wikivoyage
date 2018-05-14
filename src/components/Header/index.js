import React from 'react';
import './index.css';
import SearchBar from '../SearchBar';

const Header = props => (
  <div className="Header">
    <SearchBar {...props} />
  </div>
);

export default Header;
