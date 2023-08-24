import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/exchange-rates">Exchange Rates</Link>
      <Link to="/converter">Converter</Link>
    </nav>
  );
}

export default Navbar;
