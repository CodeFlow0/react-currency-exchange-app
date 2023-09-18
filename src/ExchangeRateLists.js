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
    <div className="page-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-12 exchange-rates-wrapper">
            <h2 id="exchange-rates-title">Exchange <span>Rates</span></h2>
            <h3 className='list-base'>Base Currency: USD</h3>
            <table className="exchange-table">
              <thead className="table-head">
                <tr className="table-subtitle">
                  <th>Currency</th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {Object.entries(exchangeRates).map(([currency, rate]) => (
                  <tr key={currency} className="table-content">
                    <td><Link to={`/currency/${currency}`} className="currency">{currency}</Link></td>
                    <td className="rate">{rate.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExchangeRateLists;
