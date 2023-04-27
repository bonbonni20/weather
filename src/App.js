import './App.css';
import { useState } from 'react';
import SearchBar from './components/SearchBar.jsx';
import CurrentWeather from './components/CurrentWeather.jsx'
import Forecast from './components/Forecast.jsx';
import axios from 'axios';

function App() {
  const [cityName, setCityName] = useState("");
  const [currentData, setCurrentData] = useState({});
  const [forecastData, setForecastData] = useState({});

  const handleSearchChange =async(searchInfo) =>
  {
    setCityName(searchInfo.name)
    await axios.get(`${process.env.REACT_APP_ONE_CALL}lat=${searchInfo.lat}&lon=${searchInfo.lon}&exclude=minutely,hourly,alerts&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
                    .then(res => {
                      setCurrentData(res.data)
                      setForecastData(res.data)                     
                    })
                    .catch(error => console.log(error))
  }
   return (
    <div>
      <SearchBar searchInfo={handleSearchChange} />
      {currentData && <CurrentWeather data={[cityName, currentData]} /> }
      {forecastData && <Forecast data={forecastData} /> }
    </div>
  )
}

export default App; 
