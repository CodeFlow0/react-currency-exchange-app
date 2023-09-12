// api.js

export const API_BASE_URL = 'https://api.frankfurter.app';

export async function getExchangeRates() {
  try {
    const response = await fetch(`${API_BASE_URL}/latest?from=USD`);
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching exchange rates');
  }
}

export async function getCurrencyPairInfo(pair) {
  try {
    const response = await fetch(`${API_BASE_URL}/latest?from=${pair}`);
    if (!response.ok) {
      throw new Error('Failed to fetch currency pair information');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching currency pair information');
  }
}
