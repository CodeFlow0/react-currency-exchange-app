import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="main-text-container">
      <div className="container text-center">
        <div className="row">
          <div className="col-12 main-text">
            <h1 id="title">Welcome to Currency Exchange App</h1>
            <p id="sub-title">Explore currency exchange rates and convert between different currencies.</p>
            <div className="button-wrapper">
              <Link to="/exchange-rates" className="left button">Exchange Rates</Link>
              <Link to="/converter" className="right button">Currency Converter</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
