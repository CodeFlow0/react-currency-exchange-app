import React, { useState, useEffect } from 'react';
import { getExchangeRates } from './api'; // Implement the API call function

function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [sourceCurrency, setSourceCurrency] = useState('USD'); // Set default to USD
  const [targetCurrency, setTargetCurrency] = useState('CAD'); // Set default to CAD
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    // Fetch currencies from the API and set them in the state
    getExchangeRates()
      .then(data => setCurrencies(Object.keys(data.rates)))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    // Fetch the exchange rate and calculate converted amount
    if (sourceCurrency !== targetCurrency) {
      getExchangeRates(sourceCurrency, targetCurrency)
        .then(data => {
          const rate = data.rates[targetCurrency];
          setConvertedAmount(amount * rate);
        })
        .catch(error => console.error(error));
    } else {
      setConvertedAmount(amount);
    }
  }, [sourceCurrency, targetCurrency, amount]);

  const handleSourceCurrencyChange = event => {
    setSourceCurrency(event.target.value);
  };

  const handleTargetCurrencyChange = event => {
    setTargetCurrency(event.target.value);
  };

  const handleAmountChange = event => {
    setAmount(event.target.value);
  };

  return (
    <div>
      <h2>Currency Converter</h2>
      <div>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={handleAmountChange} />
      </div>
      <div>
        <label>Source Currency:</label>
        <select value={sourceCurrency} onChange={handleSourceCurrencyChange}>
          {currencies.map(currency => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Target Currency:</label>
        <select value={targetCurrency} onChange={handleTargetCurrencyChange}>
          {currencies.map(currency => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p>
          {amount} {sourceCurrency} is approximately {convertedAmount.toFixed(2)}{' '}
          {targetCurrency}
        </p>
      </div>
    </div>
  );
}

export default CurrencyConverter;
