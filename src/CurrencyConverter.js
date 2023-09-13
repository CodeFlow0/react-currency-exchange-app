import React, { useState, useEffect } from 'react';
import { getExchangeRates } from './api';
import { Chart } from 'chart.js/auto';
import { BsCheckCircle } from 'react-icons/bs';
import './CurrencyConverter.css';

const API_BASE_URL = 'https://api.frankfurter.app?base=USD';

function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [sourceCurrency, setSourceCurrency] = useState('USD'); // Set default to USD
  const [targetCurrency, setTargetCurrency] = useState('CAD'); // Set default to CAD
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [priceData, setPriceData] = useState([]);
  const [priceChart, setPriceChart] = useState(null); // Declare using useState

  // Function to update the chart with new data
  const updateChart = (dates, prices) => {
    const ctx = document.getElementById('priceChart').getContext('2d');
    if (priceChart) {
      priceChart.data.labels = dates;
      priceChart.data.datasets[0].data = prices;
      priceChart.data.datasets[0].label = `${sourceCurrency}/${targetCurrency}`;
      priceChart.update();
    } else {
      const chartOptions = {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            label: `${sourceCurrency}/${targetCurrency}`,
            data: prices,
            borderColor: '#f45608',
            borderWidth: 1,
            fill: false
          }]
        }
      };
      const newPriceChart = new Chart(ctx, chartOptions);
      setPriceChart(newPriceChart);
    }
  };

  useEffect(() => {
    // Fetch historical prices for the currency pair
    fetch(`${API_BASE_URL}/1999-01-04..?from=${sourceCurrency}&to=${targetCurrency}`)
      .then(response => response.json())
      .then(data => {
        const dates = Object.keys(data.rates).sort();
        const prices = dates.map(date => data.rates[date][targetCurrency]);
        setPriceData(prices);

        // Update the chart with new data
        updateChart(dates, prices);
      })
      .catch(error => console.error(error));
  }, [sourceCurrency, targetCurrency]);

  useEffect(() => {
    // Fetch currencies from the API and set them in the state
    getExchangeRates()
      .then(data => {
        // Manually add 'USD' to the list of currencies if not present
        const currencyList = Object.keys(data.rates);
        if (!currencyList.includes('USD')) {
          currencyList.unshift('USD');
        }
        setCurrencies(currencyList);
      })
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
    <div className="container-fluid">
      <div className="row content-wrapper">
        <div className="col-12 col-md-7 converter-wrapper">
          <h2 id="converter-title">Currency Converter</h2>
          <div className="input">
            <label className="input-label">Amount:</label>
            <input type="number" value={amount} onChange={handleAmountChange} className="number-input" />
          </div>
          <div className="input">
            <label className="input-label">Source Currency:</label>
            <select value={sourceCurrency} onChange={handleSourceCurrencyChange} className="dropdown-input">
              {currencies.map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div className="input">
            <label className="input-label">Target Currency:</label>
            <select value={targetCurrency} onChange={handleTargetCurrencyChange} className="dropdown-input">
              {currencies.map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className=" col-12 col-md-5 result-wrapper">
          <div className="checkmark-wrapper">
            <BsCheckCircle className="checkmark" />
          </div>
          <div className="amounts-text">
            <p className="amount entered">{amount}<span className="selected-currency">{sourceCurrency}</span></p>
            <p className="amount converted">{convertedAmount.toFixed(2)}{' '}<br /><span className="selected-currency">{targetCurrency}</span></p>
          </div>
        </div>
      </div>
      {/* Chart Component */}
      <div className='col-12'>
        <canvas id='priceChart' width='400' height='200' className='p-5'></canvas>
      </div>
    </div>
  );
}

export default CurrencyConverter;
