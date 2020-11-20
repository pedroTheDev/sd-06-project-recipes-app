import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from "../images/profileIcon.svg";
import searchIcon from "../images/searchIcon.svg";
import "./Header.css";

const Header = () => (
  <section className="header">
    <Link to="" data-testid="profile-top-btn" className="image">
      <img src={profileIcon} />
    </Link>
    <h1 data-testids="page-title">PageTitle</h1>
    <Link to="" data-testids="search-top-btn" className="image">
      <img src={searchIcon} />
    </Link>
  </section>
);

export default Header;
