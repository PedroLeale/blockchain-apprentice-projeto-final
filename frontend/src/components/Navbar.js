// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/doctor">Doctor</Link>
        </li>
        <li>
          <Link to="/pharmacist">Pharmacist</Link>
        </li>
        <li>
          <Link to="/owner">Owner</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;