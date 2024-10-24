import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">Flight Predictor</div>
      <button 
        className="navbar-toggle"
        onClick={() => setIsNavExpanded(!isNavExpanded)}
      >
        <span className="navbar-toggler-icon">{isNavExpanded ? '✖' : '☰'}</span>
      </button>
      <div className={isNavExpanded ? "navbar-links expanded" : "navbar-links"}>
        {/* <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <a href="#signOut">Sign Out</a> */}
      </div>
    </nav>
  );
}

export default Navbar;
