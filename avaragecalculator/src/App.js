import React, { useState } from 'react';
import './App.css';

const API_BASE = 'http://localhost:3000'; // Change this to your microservice backend URL

function App() {
  const [numbers, setNumbers] = useState([]);
  const [average, setAverage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchNumbers = async (type) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/${type}`);
      const data = await res.json();
      const nums = data.numbers || [];
      setNumbers(nums);
      const avg = nums.length > 0 ? (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(2) : null;
      setAverage(avg);
    } catch (error) {
      console.error('Failed to fetch numbers:', error);
      setNumbers([]);
      setAverage(null);
    }
    setLoading(false);
  };

  const fetchNumberById = async (id) => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/numbers/${id}`);
      const data = await res.json();
      const num = data.number;
      setNumbers([num]);
      setAverage(num);
    } catch (error) {
      console.error('Failed to fetch number by ID:', error);
      setNumbers([]);
      setAverage(null);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>📊 Average Calculator</h1>

      <div className="buttons">
        <button onClick={() => fetchNumbers('primes')}>Prime Numbers</button>
        <button onClick={() => fetchNumbers('fibo')}>Fibonacci Numbers</button>
        <button onClick={() => fetchNumbers('even')}>Even Numbers</button>
        <button onClick={() => fetchNumbers('rand')}>Random Numbers</button>
      </div>

      <div className="fetch-id">
        <input type="number" placeholder="Enter number ID" id="numberId" />
        <button onClick={() => fetchNumberById(document.getElementById('numberId').value)}>Get by ID</button>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && numbers.length > 0 && (
        <div className="results">
          <h2>Numbers:</h2>
          <p>{numbers.join(', ')}</p>
          <h3>Average: {average}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
