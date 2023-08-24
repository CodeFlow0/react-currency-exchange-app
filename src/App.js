import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import LandingPage from './LandingPage';
import ExchangeRateLists from './ExchangeRateLists';
import CurrencyPairPage from './CurrencyPairPage';
import CurrencyConverter from './CurrencyConverter';
import Footer from './Footer';

import './App.css';


function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/exchange-rates" exact component={ExchangeRateLists} />
        <Route path="/currency/:pair" component={CurrencyPairPage} />
        <Route path="/converter" component={CurrencyConverter} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
