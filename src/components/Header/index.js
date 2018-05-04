import React from 'react';
import './index.css';
import SearchBar from '../SearchBar';

const Header = ({ onPageSelected }) => (
  <div className="Header">
    <SearchBar onPageSelected={onPageSelected} />
  </div>
);

export default Header;