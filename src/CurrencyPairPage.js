import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCurrencyPairInfo } from './api';
import './CurrencyPairPage.css';

function CurrencyPairPage() {
  const { pair } = useParams();
  const [pairInfo, setPairInfo] = useState({});

  useEffect(() => {
    getCurrencyPairInfo(pair)
      .then(data => setPairInfo(data))
      .catch(error => console.error(error));
  }, [pair]);

  return (
    <div className="pair-page-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-12 pair-info-wrapper">
            <h2 className="pair-name">{pair}</h2>
            {pairInfo.base ? <p className="base">Base: {pairInfo.base}</p> : null}
            {pairInfo.date ? <p className="date">Date: {pairInfo.date}</p> : null}
            {pairInfo.rates && Object.keys(pairInfo.rates).length > 0 ? (
              <ul className="pair-info">
                {Object.entries(pairInfo.rates).map(([currency, rate]) => (
                  <li key={currency}>{currency}: {rate}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrencyPairPage;
