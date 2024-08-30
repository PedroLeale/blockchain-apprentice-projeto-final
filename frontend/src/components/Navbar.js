// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
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
