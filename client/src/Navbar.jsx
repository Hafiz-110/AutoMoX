import React from 'react';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px', background: '#282c34', color: 'white' }}>
      <h2>AutoMoX Navigation</h2>
      <a href="/trade-in" className="nav-item">Trade-In</a>
    </nav>
  );
};

export default Navbar;