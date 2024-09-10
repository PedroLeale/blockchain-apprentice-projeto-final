import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/doctor" className={location.pathname === '/doctor' ? 'active' : ''}>Doctor</Link>
        </li>
        <li>
          <Link to="/pharmacist" className={location.pathname === '/pharmacist' ? 'active' : ''}>Pharmacist</Link>
        </li>
        <li>
          <Link to="/owner" className={location.pathname === '/owner' ? 'active' : ''}>Owner</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
