import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCurrencyPairInfo } from './api';

function CurrencyPairPage() {
  const { pair } = useParams();
  const [pairInfo, setPairInfo] = useState({});

  useEffect(() => {
    getCurrencyPairInfo(pair)
      .then(data => setPairInfo(data))
      .catch(error => console.error(error));
  }, [pair]);

  return (
    <div>
      <h2>{pair}</h2>
      {pairInfo.base ? <p>Base: {pairInfo.base}</p> : null}
      {pairInfo.date ? <p>Date: {pairInfo.date}</p> : null}
      {pairInfo.rates && Object.keys(pairInfo.rates).length > 0 ? (
        <ul>
          {Object.entries(pairInfo.rates).map(([currency, rate]) => (
            <li key={currency}>{currency}: {rate}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default CurrencyPairPage;
