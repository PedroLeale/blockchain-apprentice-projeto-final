import React from 'react';
import '../styles/Button.css';

const Button = ({ onClick, children, className = "" }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
