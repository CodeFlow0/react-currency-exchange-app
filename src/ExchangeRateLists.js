import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getExchangeRates } from './api';
import './ExchangeRateLists.css';

function ExchangeRateLists() {
  const [exchangeRates, setExchangeRates] = useState([]);

  useEffect(() => {
    getExchangeRates()
      .then(data => setExchangeRates(data.rates))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Exchange Rates</h2>
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(exchangeRates).map(([currency, rate]) => (
            <tr key={currency}>
              <td><Link to={`/currency/${currency}`}>{currency}</Link></td>
              <td>{rate.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExchangeRateLists;
