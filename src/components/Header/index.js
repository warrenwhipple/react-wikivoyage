import React from 'react';
import './index.css';
import SearchBar from '../SearchBar';

const Header = ({ wiki, onPageSelected }) => (
  <div className="Header">
    <SearchBar wiki={wiki} onPageSelected={onPageSelected} />
  </div>
);

export default Header;
