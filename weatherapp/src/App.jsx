import React, { useState } from 'react';


const App = () => {
  const [City, setCity] = useState("");
  const [Result, setResult] = useState("");

  const handlerClick = (e) => {
    setCity(e.target.value);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=d885aa1d783fd13a55050afeef620fcb`)
      .then(res => res.json())
      .then(data => {
        const Kelvin = data.main.temp;
        const Celsius = Kelvin - 273.15;
        setResult(`Temperature in ${City}: ${Math.round(Celsius)}°C`);
        setCity("");
      })
      .catch(error => {
        setResult("City not found",error);
      });
  };

  return (
    <div className='container'>
      <div className='main fade-in'>
        <h1>WeatherApp</h1>
        <form onSubmit={handlerSubmit}>
          <input
            type="text"
            placeholder='Enter City'
            required
            value={City}
            onChange={handlerClick}
          /><br /><br />
          <button type='submit'>Get Temperature</button>
        </form>
        <h2>{Result}</h2>
      </div>
    </div>
  );
};

export default App;
