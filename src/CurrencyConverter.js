import React, { useState, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import { BsCheckCircle } from 'react-icons/bs';
import './CurrencyConverter.css';

function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [sourceCurrency, setSourceCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('CAD');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [priceData, setPriceData] = useState([]);
  const [priceChart, setPriceChart] = useState(null);

  useEffect(() => {
    // Fetch the list of available currencies
    fetch('https://api.frankfurter.app/currencies')
      .then(response => response.json())
      .then(data => {
        const currencyList = Object.keys(data);
        setCurrencies(currencyList);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    // Fetch exchange rates and calculate converted amount when source or target currency changes
    fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${sourceCurrency}&to=${targetCurrency}`)
      .then(response => response.json())
      .then(data => {
        setConvertedAmount(data.rates[targetCurrency]);
      })
      .catch(error => console.error(error));
  }, [sourceCurrency, targetCurrency, amount]);

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
    fetch(`https://api.frankfurter.app/${sourceCurrency}.json?from=1999-01-04&to=${targetCurrency}`)
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
