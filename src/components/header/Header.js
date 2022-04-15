import React from 'react';
import { Link } from 'react-router-dom';
import profile from '../../images/profile-icon.png';
import './header.scss';

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <div className="logo">Movie App</div>
      </Link>
      <div className="user-image">
        <img src={profile} alt="user" />
      </div>
    </div>
  );
};

export default Header;
